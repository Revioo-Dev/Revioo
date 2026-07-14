import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/types/database";

// GET /api/profile — get the authenticated user's profile
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ profile: data });
}

// PATCH /api/profile — update the authenticated user's profile
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { full_name?: string | null; avatar_url?: string | null };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload: { full_name?: string | null; avatar_url?: string | null } = {};
  if ("full_name" in body) payload.full_name = body.full_name ?? null;
  if ("avatar_url" in body) payload.avatar_url = body.avatar_url ?? null;

  if (Object.keys(payload).length === 0) {
    return NextResponse.json(
      { error: "Provide at least one of: full_name, avatar_url" },
      { status: 422 }
    );
  }

  // Use admin client for DB write — user is already verified above;
  // the .eq("id", user.id) filter enforces the ownership constraint.
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("profiles")
    .update(payload)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile: data as Profile });
}
