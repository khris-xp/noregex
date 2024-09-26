import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen font-[family-name:var(--font-geist-sans)]">
      <header className="bg-blue-700 w-full p-6">This is Header</header>
      <main className="flex h-full justify-center items-center p-8 pb-20 sm:p-20">
        <a href="/download" className="p-4 bg-blue-600 rounded-lg shadow-md">Test Download</a>
      </main>
      <footer className="bg-blue-700 w-full p-6"> This is Footer</footer>
    </div>
  );
}
