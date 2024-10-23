import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-alma-green">
      <h1 className="text-4xl font-bold mb-8">Welcome to Alma AI</h1>
      <div className="space-y-4">
        <Link href="/lead-form" className="block">
          <button className="w-64 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Submit Lead
          </button>
        </Link>
        <Link href="/admin/login" className="block">
          <button className="w-64 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
}
