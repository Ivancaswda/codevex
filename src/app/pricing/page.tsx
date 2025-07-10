'use client'
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { useUser } from "@clerk/nextjs";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";
import { useQuery } from "convex/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Header from "@/app/(root)/_components/Header";

function PricingPage() {
  const { user } = useUser();

  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const convexUser = useQuery(api.users.getUser, {
    userId: user?.id || "",
  });

  if (convexUser?.isPro) return <ProPlanView />;

  return (
      <div className="h-full w-full bg-[#0b0b0e]">
        <Header />
        <AuroraBackground>
          <div className="text-4xl md:text-5xl text-white font-extrabold tracking-tight text-center">
            Добро пожаловать в <span className="text-green-400">Codevex</span>
          </div>
          <p className="mt-4 text-center text-gray-400 max-w-2xl mx-auto text-lg">
            Раскройте профессиональные возможности разработки с мощными инструментами и вдохновляющим UI.
          </p>
        </AuroraBackground>

        {/* Enterprise Features */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 mb-24 px-6">
          {ENTERPRISE_FEATURES.map((feature) => (
              <div
                  key={feature.label}
                  className="group relative bg-gradient-to-br from-[#0f0f13] to-[#15151b] border border-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500/10 ring-1 ring-green-500/20 mb-4">
                  <feature.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-green-300">
                  {feature.label}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
          ))}
        </section>

        {/* Pricing Card */}
        <section className="relative max-w-5xl mx-auto px-6 mb-32">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 to-purple-400/20 blur-2xl opacity-10 pointer-events-none" />

          <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-3xl border border-gray-800 p-12 shadow-xl">
            <div className="text-center mb-12">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-green-500/10 to-purple-500/10 ring-1 ring-gray-700 mb-6">
                <Star className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Пожизненный доступ Pro</h2>
              <div className="flex items-end justify-center gap-2 mb-4">
                <span className="text-xl text-gray-400">$</span>
                <span className="text-6xl font-extrabold text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-100 bg-clip-text">39</span>
                <span className="text-lg text-gray-400">один раз</span>
              </div>
              <p className="text-gray-400 text-md max-w-xl mx-auto">
                Доступ ко всем функциям Codevex без подписки — один платёж навсегда.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 mb-12">
              <FeatureCategory label="Разработка">
                {FEATURES.development.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                ))}
              </FeatureCategory>

              <FeatureCategory label="Сотрудничество">
                {FEATURES.collaboration.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                ))}
              </FeatureCategory>

              <FeatureCategory label="CI/CD и Деплой">
                {FEATURES.deployment.map((feature, idx) => (
                    <FeatureItem key={idx}>{feature}</FeatureItem>
                ))}
              </FeatureCategory>
            </div>

            <div className="flex justify-center">
              {user ? <UpgradeButton /> : <LoginButton />}
            </div>
          </div>
        </section>
      </div>
  );
}

export default PricingPage;