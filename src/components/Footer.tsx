import Link from "next/link";

export default function Footer() {
  return (
    <div className="mx-auto p-4 py-6 lg:py-8 w-full">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0 ml-0 md:ml-96">
          <span className="flex items-center self-center text-2xl font-semibold whitespace-nowrap">
            Source Code
          </span>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Frontend
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <Link
                  href="https://github.com/khris-xp/noregex"
                  className="hover:underline"
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
              Backend
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <Link
                  href="https://github.com/Hom-ksd/toc"
                  className="hover:underline "
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
