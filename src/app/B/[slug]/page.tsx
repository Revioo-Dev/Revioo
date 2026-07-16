import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get business
  const { data: business } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!business) {
    notFound();
  }

  // Get catalogue
  const { data: items } = await supabase
    .from("catalogue_items")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          {business.logo_url && (
            <Image
              src={business.logo_url}
              alt={business.name}
              width={80}
              height={80}
              className="rounded-full"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <p className="text-gray-500">
              {items?.length ?? 0} catalogue items
            </p>
          </div>
        </div>

        {!items || items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No catalogue items found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white shadow p-4"
              >
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={500}
                    height={300}
                    className="w-full h-48 rounded-xl object-cover"
                  />
                )}

                <h2 className="mt-4 text-xl font-semibold">
                  {item.name}
                </h2>

                {item.description && (
                  <p className="mt-2 text-gray-600">
                    {item.description}
                  </p>
                )}

                {item.price && (
                  <p className="mt-4 text-lg font-bold text-purple-600">
                    Rs. {item.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
