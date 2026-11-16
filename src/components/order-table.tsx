"use client";
import Link from "next/link";
import { ArrowUpDown, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Order } from "@/lib/types";
import {
  deadlineLabel,
  deadlineState,
  formatDate,
  formatNaira,
  initials,
} from "@/lib/utils";
import { DeadlinePill, StagePill } from "./status-pill";
import { inputClass } from "./ui";
export function OrderTable({
  orders,
  compact = false,
}: {
  orders: Order[];
  compact?: boolean;
}) {
  const [q, setQ] = useState(""),
    [filter, setFilter] = useState("all"),
    [sort, setSort] = useState<"due" | "recent">("due");
  const shown = useMemo(
    () =>
      orders
        .filter((o) =>
          `${o.customerName} ${o.outfitType} ${o.id}`
            .toLowerCase()
            .includes(q.toLowerCase()),
        )
        .filter(
          (o) =>
            filter === "all" ||
            (filter === "overdue" && deadlineState(o) === "overdue") ||
            (filter === "soon" && deadlineState(o) === "soon") ||
            o.stage === filter,
        )
        .sort((a, b) =>
          sort === "due"
            ? a.deliveryDate.localeCompare(b.deliveryDate)
            : b.updatedAt.localeCompare(a.updatedAt),
        )
        .slice(0, compact ? 6 : 99),
    [orders, q, filter, sort, compact],
  );
  return (
    <div className="card overflow-hidden rounded-[24px]">
      <div className="flex flex-col gap-3 border-b border-[#183e34]/8 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8a8e8b]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={`${inputClass} pl-11`}
            placeholder="Search customer, outfit or ID"
          />
        </div>
        <div className="flex gap-2">
          <select
            aria-label="Filter orders"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`${inputClass} min-w-0 flex-1 sm:w-42`}
          >
            <option value="all">All orders</option>
            <option value="soon">Due soon</option>
            <option value="overdue">Overdue</option>
            <option value="Fabric cut">Fabric cut</option>
            <option value="Sewing in progress">Sewing in progress</option>
            <option value="Ready for pickup">Ready for pickup</option>
            <option value="Collected">Collected</option>
          </select>
          <button
            onClick={() => setSort((v) => (v === "due" ? "recent" : "due"))}
            className="grid size-12 shrink-0 place-items-center rounded-xl border border-[#d9d8cf] bg-white"
            title={`Sort by ${sort === "due" ? "recent activity" : "delivery date"}`}
          >
            <ArrowUpDown className="size-4" />
          </button>
        </div>
      </div>
      {shown.length === 0 ? (
        <div className="grid min-h-72 place-items-center p-8 text-center">
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#edf0eb]">
              <Search className="size-5 text-[#718078]" />
            </span>
            <h3 className="mt-4 font-serif text-xl font-semibold">
              No matching orders
            </h3>
            <p className="mt-2 text-sm text-[#7a807c]">
              Try a different name, stage or deadline filter.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#f7f5ef] text-[10px] uppercase tracking-[.12em] text-[#828783]">
                  <th className="px-5 py-4">Customer & outfit</th>
                  <th className="px-5 py-4">Stage</th>
                  <th className="px-5 py-4">Delivery</th>
                  <th className="px-5 py-4">Balance</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {shown.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-[#183e34]/7 transition hover:bg-[#f9f7f1]"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e7ded0] font-serif text-sm font-bold text-[#355a4e]">
                          {initials(o.customerName)}
                        </span>
                        <div>
                          <Link
                            href={`/dashboard/orders/${o.id}`}
                            className="text-sm font-bold hover:text-[#2d6655]"
                          >
                            {o.customerName}
                          </Link>
                          <p className="mt-0.5 text-xs text-[#858a86]">
                            {o.outfitType} · {o.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <StagePill stage={o.stage} />
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs font-semibold">
                        {formatDate(o.deliveryDate)}
                      </p>
                      <div className="mt-1">
                        <DeadlinePill order={o} />
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold">
                      {formatNaira(o.totalAmount - o.depositAmount)}
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/orders/${o.id}`}
                        aria-label={`View ${o.customerName}`}
                      >
                        <ChevronRight className="size-4 text-[#8c918e]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-[#183e34]/7 md:hidden">
            {shown.map((o) => (
              <Link
                href={`/dashboard/orders/${o.id}`}
                key={o.id}
                className="block p-5 transition active:bg-[#f2efe7]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold">{o.customerName}</p>
                    <p className="mt-1 text-xs text-[#7c827e]">
                      {o.outfitType} · {o.id}
                    </p>
                  </div>
                  <DeadlinePill order={o} />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <StagePill stage={o.stage} />
                  <span className="text-xs font-semibold text-[#626a65]">
                    {deadlineLabel(o)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
