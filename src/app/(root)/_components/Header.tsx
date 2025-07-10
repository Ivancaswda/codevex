'use client'
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { useQuery } from "convex/react";
import Image from "next/image";

function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const { user } = useUser();

  const convexUser = useQuery(api.users.getUser, {
    userId: user?.id || "",
  });
  console.log(convexUser)

  return (
      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-neutral-800 shadow-md">

          <Link href="/" className="flex items-center space-x-2 group">
            <Image alt='logo' width={66} height={66} className='rounded-lg' src='/logo.png'/>


          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            <Link
                href="/snippets"
                className="text-sm text-neutral-200 hover:text-white px-3 py-1.5 rounded-md border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <div className="flex items-center gap-1">
                <Code2 className="w-4 h-4 text-green-400" />
                Фрагменты
              </div>
            </Link>

            {!convexUser?.isPro && (
                <Link
                    href="/pricing"
                    className="text-sm text-green-400 px-3 py-1.5 rounded-md border border-green-400/40 hover:bg-green-400/10 transition"
                >
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Pro
                  </div>
                </Link>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSelector />
            <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            <SignedIn>
              <RunButton />
            </SignedIn>
            <HeaderProfileBtn />
          </div>
        </header>
      </div>
  );
}
export default Header;
