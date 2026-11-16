"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  House,
  Menu,
  Moon,
  Plus,
  RotateCcw,
  Scissors,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button, ConfirmDialog, DemoBadge } from "./ui";
import { useOrders } from "./orders-provider";
import { cn } from "@/lib/utils";
const nav = [
  { href: "/dashboard", label: "Overview", icon: House },
  { href: "/dashboard/orders", label: "All orders", icon: ClipboardList },
];
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const path = usePathname(),
    { reset } = useOrders(),
    [open, setOpen] = useState(false),
    [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("stitchflow.dashboard.theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(saved ? saved === "dark" : prefersDark);
  }, []);
  const toggleTheme = () => {
    setDark((current) => {
      const next = !current;
      localStorage.setItem(
        "stitchflow.dashboard.theme",
        next ? "dark" : "light",
      );
      return next;
    });
  };
  const sidebar = (
    <>
      <Link href="/" className="flex items-center gap-3 px-2">
        <span className="grid size-10 place-items-center rounded-full bg-[#f5e8c8] text-[#153f34]">
          <Scissors className="size-4" />
        </span>
        <span>
          <b className="block font-serif text-xl leading-none text-white">
            StitchFlow
          </b>
          <small className="text-[9px] font-bold uppercase tracking-[.25em] text-white/45">
            Studio
          </small>
        </span>
      </Link>
      <nav className="mt-12 grid gap-2">
        {nav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? path === item.href
              : path.startsWith(item.href);
          return (
            <Link
              onClick={() => setOpen(false)}
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-white">
            Prototype workspace
          </p>
          <p className="mt-2 text-[11px] leading-5 text-white/45">
            Data is stored in this browser only and is not synced.
          </p>
        </div>
        <ConfirmDialog
          trigger={
            <button className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-semibold text-white/55 transition hover:bg-white/5 hover:text-white">
              <RotateCcw className="size-4" />
              Reset demo data
            </button>
          }
          title="Reset all demo data?"
          description="This will remove your local changes and restore the original 12 sample orders. This cannot be undone."
          action={reset}
          actionLabel="Reset data"
        />
      </div>
    </>
  );
  return (
    <div
      className={cn(
        "dashboard-theme min-h-screen bg-[#f4f1e9]",
        dark && "dashboard-dark",
      )}
    >
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#12382f] p-6 lg:flex grid-pattern">
        {sidebar}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/35"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-72 flex-col bg-[#12382f] p-6 shadow-2xl grid-pattern">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-4 top-4 rounded-full p-2 text-white/60"
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-[#153f34]/8 bg-[#f4f1e9]/90 px-4 backdrop-blur-xl sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-[#153f34]/10 bg-white p-2.5 lg:hidden"
            >
              <Menu className="size-4" />
            </button>
            <DemoBadge />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              title={dark ? "Light mode" : "Dark mode"}
              className="theme-toggle grid size-9 place-items-center rounded-full border border-[#153f34]/10 bg-white text-[#4b514d] transition hover:border-[#153f34]/30"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
          <Button asChild size="sm">
            <Link href="/dashboard/orders/new">
              <Plus className="size-4" />
              New order
            </Link>
          </Button>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
