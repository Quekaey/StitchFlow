"use client";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Copy,
  Phone,
  Save,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrders } from "@/components/orders-provider";
import { Button, Field, inputClass } from "@/components/ui";
import { STAGES, type ProductionStage } from "@/lib/types";
import {
  deadlineLabel,
  formatDate,
  formatDateTime,
  formatNaira,
  stageIndex,
} from "@/lib/utils";
import { DeadlinePill } from "@/components/status-pill";
import { stageMessage } from "@/lib/seed";
export default function OrderDetail() {
  const { id } = useParams<{ id: string }>(),
    { orders, ready, update, updateStage } = useOrders(),
    order = orders.find((o) => o.id === id),
    [stage, setStage] = useState<ProductionStage>("Order confirmed"),
    [message, setMessage] = useState(""),
    [notes, setNotes] = useState(""),
    [copied, setCopied] = useState(false),
    [saved, setSaved] = useState(false);
  useEffect(() => {
    if (order) {
      setStage(order.stage);
      setMessage(stageMessage(order.stage));
      setNotes(order.notes);
    }
  }, [order]);
  if (!ready)
    return <div className="min-h-96 animate-pulse rounded-3xl bg-white/50" />;
  if (!order)
    return (
      <div className="grid min-h-96 place-items-center text-center">
        <div>
          <h1 className="font-serif text-3xl">Order not found</h1>
          <Button asChild className="mt-5">
            <Link href="/dashboard/orders">Return to orders</Link>
          </Button>
        </div>
      </div>
    );
  const copy = async () => {
    await navigator.clipboard.writeText(
      `${location.origin}/track/${order.trackingToken}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const saveNotes = () => {
    update(order.id, { notes });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };
  const changeStage = () => {
    if (stage !== order.stage) {
      updateStage(order.id, stage, message.trim() || stageMessage(stage));
    }
  };
  return (
    <div className="rise">
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#5f6863]"
      >
        <ArrowLeft className="size-4" />
        Back to orders
      </Link>
      <div className="mt-5 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9a7737]">
              {order.id}
            </p>
            <DeadlinePill order={order} />
          </div>
          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            {order.customerName}
          </h1>
          <p className="mt-2 text-sm text-[#737a75]">
            {order.outfitType} · {order.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={copy}>
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
            {copied ? "Link copied" : "Copy tracking link"}
          </Button>
        </div>
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="card rounded-[26px] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8f743d]">
                  Production
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Update stage
                </h2>
              </div>
              <span className="text-xs text-[#7c827e]">
                {stageIndex(order.stage) + 1} of {STAGES.length}
              </span>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {STAGES.map((s, i) => (
                <button
                  onClick={() => {
                    setStage(s);
                    setMessage(stageMessage(s));
                  }}
                  key={s}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left text-xs font-semibold transition ${stage === s ? "border-[#2d6655] bg-[#e9f0ec] text-[#1f5444]" : "border-[#dcddd7] bg-white text-[#68706b] hover:border-[#91a49c]"}`}
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[10px] ${i <= stageIndex(order.stage) ? "bg-[#153f34] text-white" : "bg-[#eceeea] text-[#828884]"}`}
                  >
                    {i < stageIndex(order.stage) ? (
                      <Check className="size-3" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-5">
              <Field
                label="Customer-visible update"
                hint="This message will appear on the tracking page"
              >
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} min-h-24 py-3`}
                />
              </Field>
            </div>
            <div className="mt-5 flex justify-end">
              <Button onClick={changeStage} disabled={stage === order.stage}>
                Save stage update
              </Button>
            </div>
          </section>
          <section className="card rounded-[26px] p-5 sm:p-7">
            <h2 className="font-serif text-2xl font-semibold">
              Status history
            </h2>
            <div className="mt-6 space-y-0">
              {[...order.history].reverse().map((h, i) => (
                <div key={h.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`mt-1 size-2.5 rounded-full ${i === 0 ? "bg-[#b08a45] ring-4 ring-[#b08a45]/15" : "bg-[#aeb5b0]"}`}
                    />
                    {i < order.history.length - 1 && (
                      <span className="my-2 h-full min-h-14 w-px bg-[#d9ddd9]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <b className="text-sm">{h.stage}</b>
                      <span className="text-[10px] text-[#919693]">
                        {formatDateTime(h.timestamp)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-[#707773]">
                      {h.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-6">
          <section className="card rounded-[26px] p-6">
            <h2 className="font-serif text-xl font-semibold">Order summary</h2>
            <dl className="mt-6 space-y-4 text-xs">
              <div className="flex justify-between gap-5">
                <dt className="text-[#7c827e]">Phone</dt>
                <dd className="flex items-center gap-2 font-semibold">
                  <Phone className="size-3" />
                  {order.phone}
                </dd>
              </div>
              <div className="flex justify-between gap-5">
                <dt className="text-[#7c827e]">Ordered</dt>
                <dd className="font-semibold">{formatDate(order.orderDate)}</dd>
              </div>
              <div className="flex justify-between gap-5">
                <dt className="text-[#7c827e]">Delivery</dt>
                <dd className="font-semibold">
                  {formatDate(order.deliveryDate)}
                </dd>
              </div>
              <div className="border-t border-[#183e34]/8 pt-4">
                <div className="flex justify-between">
                  <dt className="text-[#7c827e]">Total</dt>
                  <dd className="font-semibold">
                    {formatNaira(order.totalAmount)}
                  </dd>
                </div>
                <div className="mt-3 flex justify-between">
                  <dt className="text-[#7c827e]">Deposit</dt>
                  <dd className="font-semibold">
                    {formatNaira(order.depositAmount)}
                  </dd>
                </div>
                <div className="mt-4 flex justify-between rounded-xl bg-[#f2eee4] p-3">
                  <dt className="font-bold">Balance due</dt>
                  <dd className="font-bold text-[#8d6928]">
                    {formatNaira(order.totalAmount - order.depositAmount)}
                  </dd>
                </div>
              </div>
            </dl>
          </section>
          <section className="card rounded-[26px] p-6">
            <h2 className="font-serif text-xl font-semibold">Studio notes</h2>
            <p className="mt-1 text-[10px] text-[#8d928f]">
              Private · never shown on tracking page
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`${inputClass} mt-4 min-h-32 py-3`}
              placeholder="Add a private note..."
            />
            <Button
              className="mt-4 w-full"
              variant="secondary"
              onClick={saveNotes}
            >
              <Save className="size-4" />
              {saved ? "Saved" : "Save notes"}
            </Button>
          </section>
          <div className="rounded-[24px] bg-[#153f34] p-6 text-white">
            <CalendarDays className="size-5 text-[#d8bf83]" />
            <p className="mt-4 text-xs text-white/55">Delivery status</p>
            <p className="mt-1 font-serif text-2xl">{deadlineLabel(order)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
