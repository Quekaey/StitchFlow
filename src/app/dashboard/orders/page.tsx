"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useOrders } from "@/components/orders-provider";
import { OrderTable } from "@/components/order-table";
import { Button } from "@/components/ui";
export default function OrdersPage(){const{orders}=useOrders();return <div className="rise"><div className="mb-7 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9a7737]">Studio ledger</p><h1 className="mt-2 font-serif text-4xl font-semibold">All orders</h1><p className="mt-2 text-sm text-[#737a75]">Search, sort and follow every order through production.</p></div><Button asChild className="hidden sm:inline-flex"><Link href="/dashboard/orders/new"><Plus className="size-4"/>New order</Link></Button></div><OrderTable orders={orders}/></div>}
