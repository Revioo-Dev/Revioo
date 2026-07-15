interface BusinessPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BusinessPage({
  params,
}: BusinessPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur">
        <div className="flex flex-col items-center text-center">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />

          <h1 className="mt-6 text-3xl font-bold">
            Business Name
          </h1>

          <p className="mt-2 text-gray-400">
            Business Slug: {slug}
          </p>

          <div className="mt-8 grid w-full gap-4">
            <button className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white">
              ⭐ Leave Google Review
            </button>

            <button className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">
              👍 Facebook
            </button>

            <button className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">
              💬 WhatsApp
            </button>

            <button className="rounded-xl bg-gray-700 px-4 py-3 font-semibold text-white">
              📞 Call Business
            </button>

            <button className="rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white">
              📍 Get Directions
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
