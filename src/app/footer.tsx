import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Image alt="logo" src="/logo.png" width={45} height={45} />
          <span className="ml-3 text-lg font-semibold text-gray-700">ShareSpace</span>
        </div>
        <div className="flex space-x-4">
          <Link className="text-blue-400 hover:text-blue-500" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-blue-400 hover:text-blue-500" href="/terms-of-service">
            Terms of Service
          </Link>
          <Link className="text-blue-400 hover:text-blue-500" href="/about">
            About
          </Link>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm py-4">
        &copy; {new Date().getFullYear()} ShareSpace. All rights reserved.
      </div>
    </footer>
  );
}
