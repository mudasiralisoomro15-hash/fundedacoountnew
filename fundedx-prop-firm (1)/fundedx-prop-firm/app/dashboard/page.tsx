"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, LogOut, Plus, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import AuthModal, { type AuthMode } from "@/components/AuthModal";
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/components/AuthProvider";
import { formatDate } from "@/components/admin/ui";
import { listMyOrders } from "@/lib/db";
import { formatSize, formatUSD } from "@/lib/plans";
import type { OrderRecord } from "@/lib/types";

export default function DashboardPage() {
  const { user, loading, isAdmin, demoMode, signOut } = useAuth();
  const [orders, setOrders] = useState<OrderRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  const uid = user?.uid;

  useEffect(() => {
    if (!uid) {
      setOrders(null);
      return;
    }
    let alive = true;
    setError(null);
    listMyOrders(uid)
      .then((o) => alive && setOrders(o))
      .catch((e) => alive && setError(e instanceof Error ? e.message : "Could not load your orders."));
    return () => {
      alive = false;
    };
  }, [uid]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <Logo className="mb-6" />
          <h1 className="font-display text-2xl font-bold text-white">Client Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to see your accounts and orders.</p>
          <button type="button" onClick={() => setAuthOpen(true)} className="btn-glow mt-6 w-full">
            Sign In
          </button>
          <Link href="/" className="mt-3 block text-sm text-slate-500 transition hover:text-slate-300">
            ← Back to website
          </Link>
          <AuthModal
            open={authOpen}
            mode={authMode}
            order={null}
            onClose={closeAuth}
            onModeChange={setAuthMode}
          />
        </div>
      </main>
    );
  }

  const pending = orders?.filter((o) => o.status === "pending").length ?? 0;
  const active = orders?.filter((o) => o.status === "active").length ?? 0;

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-obsidian/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
              >
                <ShieldCheck className="h-3.5 w-3.5" /> Admin
              </Link>
            )}
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/5"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Welcome back</p>
            <h1 className="font-display text-3xl font-bold text-white">{user.name}</h1>
            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          </div>
          <Link href="/#models" className="btn-glow px-5 py-3 text-sm">
            <Plus className="h-4 w-4" /> Start New Challenge
          </Link>
        </div>

        {demoMode && (
          <p className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Demo mode: Firebase is not connected, so this data lives only in this browser.
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total orders", value: orders?.length ?? 0 },
            { label: "Pending", value: pending },
            { label: "Active accounts", value: active },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-emerald-500/20 bg-card/70 p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-2xl border border-white/10 bg-card/70 p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-white">My orders</h2>

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {orders === null && !error ? (
            <Loader2 className="mx-auto mt-8 h-6 w-6 animate-spin text-emerald-400" />
          ) : orders && orders.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-slate-400">You have no orders yet.</p>
              <Link href="/#models" className="btn-glow mt-4 px-5 py-3 text-sm">
                View Funded Plans
              </Link>
            </div>
          ) : (
            orders && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Plan</th>
                      <th className="px-4 py-3 font-medium">Size</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="border-b border-white/5 last:border-b-0">
                        <td className="px-4 py-3 text-slate-400">{formatDate(o.createdAt)}</td>
                        <td className="px-4 py-3 font-medium text-white">{o.modelName}</td>
                        <td className="px-4 py-3 text-slate-300">{formatSize(o.size)}</td>
                        <td className="px-4 py-3 font-semibold text-emerald-400">{formatUSD(o.price)}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={o.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </section>
      </main>
    </div>
  );
}
