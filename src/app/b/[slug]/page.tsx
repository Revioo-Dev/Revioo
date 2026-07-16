import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch business
const { data } = await supabase
  .from("businesses")
  .select("*")
  .eq("slug", slug)
  .single();

const business = data as any;

  if (!business) {
    notFound();
  }

  // Fetch catalogue items
  const { data: items } = await supabase
    .from("catalogue_items")
    .select("*")
    .eq("business_id", business.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            {business.logo_url && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={business.logo_url}
                  alt={business.business_name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {business.business_name}
              </h1>
              {business.category && (
                <p className="text-sm text-purple-600 font-medium">
                  {business.category}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items && items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-100">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                      No Image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <p className="text-lg font-bold text-purple-600">
  {item.price ? `Rs. ${item.price}` : "Price not available"}
</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
              <p className="text-gray-500 text-lg">No catalogue items yet.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
