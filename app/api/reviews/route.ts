import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Review, ReviewInsert } from "@/types/database";

// GET /api/reviews — list the authenticated user's reviews
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const rating = searchParams.get("rating");
  const responded = searchParams.get("responded");

  // Use admin client so the query is never blocked by RLS edge cases
  const admin = createAdminClient();
  let query = admin
    .from("reviews")
    .select("*")
    .eq("user_id", user.id)            // scope to this user
    .order("created_at", { ascending: false });

  if (platform) query = query.eq("platform", platform);
  if (rating) query = query.eq("rating", Number(rating));
  if (responded !== null && responded !== "")
    query = query.eq("responded", responded === "true");

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reviews: data as Review[] });
}

// POST /api/reviews — create a new review
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Partial<ReviewInsert>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { reviewer_name, platform, rating, text } = body;

  if (!reviewer_name || !rating || !text) {
    return NextResponse.json(
      { error: "reviewer_name, rating, and text are required" },
      { status: 422 }
    );
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "rating must be an integer between 1 and 5" },
      { status: 422 }
    );
  }

  const insert: ReviewInsert = {
    user_id: user.id,
    reviewer_name,
    platform: platform ?? "Google",
    rating,
    text,
    reviewer_email: body.reviewer_email ?? null,
    responded: false,
  };

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("reviews")
    .insert(insert)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data as Review }, { status: 201 });
}

// PATCH /api/reviews — update a review (mark responded, add response text)
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    id: string;
    responded?: boolean;
    response_text?: string | null;
    rating?: number;
    text?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { id, ...updates } = body;
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 422 });
  }

  const admin = createAdminClient();
  // Scope the update to this user's review via .eq("user_id", user.id)
  const { data, error } = await admin
    .from("reviews")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data as Review });
}

// DELETE /api/reviews?id=… — delete a review
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "id query param required" },
      { status: 422 }
    );
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("reviews")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);  // scope deletion to this user

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
