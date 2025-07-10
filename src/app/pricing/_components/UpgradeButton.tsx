
import { Zap } from "lucide-react";
import Link from "next/link";

export default function UpgradeButton() {
  const CHEСKOUT_URL =
    "https://codevex.lemonsqueezy.com/buy/b4c3a095-fd0c-4258-9506-7fbf79412b16";

  return (
    <a target='_blank'
      href={CHEСKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-green-500 to-green-600 rounded-lg
        hover:from-green-600 hover:to-green-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Получи Pro
    </a>
  );
}
