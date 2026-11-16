"use client";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  PackageCheck,
  Scissors,
} from "lucide-react";
import { useOrders } from "@/components/orders-provider";
import { OrderTable } from "@/components/order-table";
import { deadlineState, formatDateTime } from "@/lib/utils";
const cards = [
  {
    key: "active",
    label: "Active orders",
    icon: Scissors,
    tone: "bg-[#e5eee9] text-[#245746]",
  },
  {
    key: "soon",
    label: "Due soon",
    icon: Clock3,
    tone: "bg-[#f4ead3] text-[#8b6825]",
  },
  {
    key: "overdue",
    label: "Overdue",
    icon: AlertTriangle,
    tone: "bg-[#f7e2dd] text-[#9b3932]",
  },
  {
    key: "complete",
    label: "Completed",
    icon: PackageCheck,
    tone: "bg-[#e7e6ee] text-[#55536e]",
  },
];
export default function Dashboard() {
  const { orders, ready } = useOrders();
  const counts = {
    active: orders.filter((o) => o.stage !== "Collected").length,
    soon: orders.filter((o) => deadlineState(o) === "soon").length,
    overdue: orders.filter((o) => deadlineState(o) === "overdue").length,
    complete: orders.filter((o) => o.stage === "Collected").length,
  };
  const recent = [...orders]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 4);
  return (
    <div className="rise">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9a7737]">
            Monday at the studio
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Good morning, Ada.
          </h1>
          <p className="mt-2 text-sm text-[#737a75]">
            Here&apos;s what needs your attention today.
          </p>
        </div>
        <Link
          href="/dashboard/orders?filter=soon"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2d6655]"
        >
          View upcoming deliveries <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.key} className="card rounded-[22px] p-4 sm:p-6">
            <div
              className={`grid size-9 place-items-center rounded-xl ${card.tone}`}
            >
              <card.icon className="size-4" />
            </div>
            <p className="mt-6 text-3xl font-bold tracking-tight">
              {ready ? counts[card.key as keyof typeof counts] : "—"}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#7b817d]">
              {card.label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-8 2xl:grid-cols-[1fr_340px]">
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold">
                Orders in motion
              </h2>
              <p className="mt-1 text-xs text-[#7a807c]">
                Your nearest deadlines and latest work
              </p>
            </div>
            <Link
              href="/dashboard/orders"
              className="text-xs font-bold text-[#2d6655]"
            >
              All orders
            </Link>
          </div>
          <OrderTable orders={orders} compact />
        </section>
        <aside>
          <h2 className="font-serif text-2xl font-semibold">Recent activity</h2>
          <div className="card mt-4 rounded-[24px] p-5">
            {recent.map((o, i) => (
              <Link
                href={`/dashboard/orders/${o.id}`}
                key={o.id}
                className="flex gap-3 pb-5 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <span className="grid size-8 place-items-center rounded-full bg-[#e4eee9] text-[#2b6251]">
                    <CheckCircle2 className="size-4" />
                  </span>
                  {i < recent.length - 1 && (
                    <span className="mt-2 h-full w-px bg-[#dcded8]" />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-xs leading-5">
                    <b>{o.customerName}</b> moved to <b>{o.stage}</b>
                  </p>
                  <p className="mt-1 text-[10px] text-[#8b908d]">
                    {formatDateTime(o.updatedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 rounded-[24px] bg-[#153f34] p-6 text-white grid-pattern">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d7c38f]">
              Studio note
            </p>
            <p className="mt-3 font-serif text-xl leading-7">
              Keep every client in the loop, without interrupting the work.
            </p>
            <p className="mt-4 text-[11px] leading-5 text-white/55">
              Update an order once. Its customer tracking page refreshes from
              the same browser-local record.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
