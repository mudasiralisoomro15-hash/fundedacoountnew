"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Answers are PLACEHOLDER copy — adjust to match your real rules.
const FAQS = [
  {
    q: "What is the difference between Static and Trailing Drawdown?",
    a: "With Static Drawdown your loss floor is fixed below your starting balance and never moves. On a $10,000 account with a 6% static drawdown, the floor is always $9,400. With Trailing Drawdown the floor follows your equity upward as you reach new highs, which locks in progress but leaves less room to give profits back. Instant Flex uses Static, Instant Lite uses Trailing.",
  },
  {
    q: "Are Expert Advisors (EAs) allowed?",
    a: "Yes. EAs and trading bots are allowed on every account model. We only ask that they are not used for abusive practices such as latency arbitrage or exploiting platform errors.",
  },
  {
    q: "How fast are payouts processed?",
    a: "Most payout requests are processed within 48 hours. You can withdraw via Crypto (USDT) or bank transfer, on-demand or bi-weekly depending on your model.",
  },
  {
    q: "Is there a consistency rule?",
    a: "No. There is no consistency rule on any account model. Trade your own strategy and keep your edge.",
  },
  {
    q: "Can I trade during high-impact news?",
    a: "Yes, news trading is allowed on all models. Keep in mind that spreads can widen and slippage can occur around major releases.",
  },
  {
    q: "What is the difference between Instant and Challenge models?",
    a: "Instant models (Flex and Lite) fund you from day one with no profit target and no minimum trading days. Challenge models (1-Step and 2-Step) require you to reach a profit target first, and come with higher drawdown limits and leverage.",
  },
  {
    q: "What happens if I hit the daily loss limit or max drawdown?",
    a: "The account is closed once a limit is breached. You can start again with a new account at any time.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Rules &amp; <span className="text-gradient">FAQ</span>
          </h2>
          <p className="mt-3 text-slate-400">Everything you need to know before you start.</p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-300 ${
                  isOpen
                    ? "border-emerald-500/40 bg-card/90 shadow-glow"
                    : "border-white/10 bg-white/5 hover:border-emerald-500/20"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="text-sm font-semibold text-white sm:text-base">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-emerald-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400 sm:px-6">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
