
import Link from "next/link";
import { Blocks, GithubIcon, TwitterIcon, InstagramIcon } from "lucide-react";
import Image from "next/image";
function Footer() {
  return (
      <footer className="relative border-t border-gray-800/50 mt-auto bg-[#111] text-gray-400">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent"/>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Logo and Description */}
            <div className="flex flex-col gap-3">
              <Link href="/" className="flex items-center space-x-2 group">
                <Image alt='logo' width={66} height={66} className='rounded-lg' src='/logo.png'/>


              </Link>
              <p className="text-sm text-gray-500 max-w-sm">
              Одна из лучших площадок для девелопера чтобы запускать, тренировать и делиться кодом в реальном времени!
              </p>
              <div className="flex gap-4 mt-2">
                <Link href="https://github.com/Ivancaswda" target="_blank" className="hover:text-white transition">
                  <GithubIcon className="size-5"/>
                </Link>
                <Link href="https://twitter.com" target="_blank" className="hover:text-white transition">
                  <TwitterIcon className="size-5"/>
                </Link>
                <Link href="https://instagram.com" target="_blank" className="hover:text-white transition">
                  <InstagramIcon className="size-5"/>
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col md:flex-row gap-8 md:justify-center">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Explore</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                  <li><Link href="/editor" className="hover:text-white transition">Editor</Link></li>
                  <li><Link href="/snippets" className="hover:text-white transition">Snippets</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Legal</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
                  <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col items-start md:items-end justify-between">
            <span className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Codevex. All rights reserved.
            </span>
              <span className="text-sm text-gray-500 mt-2 md:mt-0">
                Made by Iwan Kätkowski
            </span>
            </div>

          </div>
        </div>
      </footer>
  );
}

export default Footer;
