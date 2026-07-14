export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        Reviooo
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-gray-400">
        Build Trust. Get Discovered.
      </p>

      <p className="mt-6 max-w-3xl text-gray-500">
        Reviooo helps businesses collect Google reviews, showcase their
        products, share digital menus, and grow customer trust—all from one
        premium platform.
      </p>

      <div className="mt-10 flex gap-4">
        <a
          href="/signup"
          className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 transition"
        >
          Get Started
        </a>

        <a
          href="/login"
          className="rounded-xl border border-gray-700 px-6 py-3 font-semibold hover:bg-gray-800 transition"
        >
          Login
        </a>
      </div>
    </main>
  );
}
