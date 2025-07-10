import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function NavigationHeader() {
  return (
      <header className="sticky top-0 z-50 w-full bg-gray-900 border-b border-gray-700/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Left: Logo + Nav Links */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 group">
                  <Image alt='logo' width={66} height={66} className='rounded-lg' src='/logo.png'/>


              </Link>

              <Link
                  href="/snippets"
                  className="flex items-center space-x-1 px-3 py-1 rounded-md text-gray-300 hover:text-white hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                <Code2 className="w-5 h-5" />
                <span>Фрагменты</span>
              </Link>
            </div>

            {/* Right: Pro Link + Profile */}
            <div className="flex items-center space-x-4">
              <SignedOut>
                <Link
                    href="/pricing"
                    className="inline-flex items-center gap-1 rounded-md px-3 py-1 text-amber-400 bg-amber-900/20 hover:bg-amber-900/40 hover:text-amber-300 transition-colors text-sm font-semibold"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Pro</span>
                </Link>
              </SignedOut>

              <HeaderProfileBtn />
            </div>
          </nav>
        </div>
      </header>
  );
}

export default NavigationHeader;
