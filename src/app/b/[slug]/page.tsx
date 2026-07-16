export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Business Catalogue</h1>
        <p className="mt-4">Slug: {slug}</p>
      </div>
    </main>
  );
}
