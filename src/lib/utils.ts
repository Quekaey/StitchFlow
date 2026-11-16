import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { STAGES, type Order, type ProductionStage } from "./types";
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatNaira(value: number) { return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(value); }
export function formatDate(value: string, long = false) { return new Intl.DateTimeFormat("en-NG", long ? { day: "numeric", month: "long", year: "numeric" } : { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`)); }
export function formatDateTime(value: string) { return new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }).format(new Date(value)); }
export function stageIndex(stage: ProductionStage) { return STAGES.indexOf(stage); }
export function daysUntil(date: string) { const today = new Date(); today.setHours(0,0,0,0); return Math.ceil((new Date(`${date}T00:00:00`).getTime() - today.getTime()) / 86400000); }
export function deadlineState(order: Order) { if (order.stage === "Collected") return "complete" as const; const days = daysUntil(order.deliveryDate); if (days < 0) return "overdue" as const; if (days <= 3) return "soon" as const; return "on-track" as const; }
export function deadlineLabel(order: Order) { const state = deadlineState(order); const days = daysUntil(order.deliveryDate); if (state === "complete") return "Collected"; if (state === "overdue") return `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`; if (days === 0) return "Due today"; if (days === 1) return "Due tomorrow"; if (state === "soon") return `Due in ${days} days`; return formatDate(order.deliveryDate); }
export function initials(name: string) { return name.split(" ").map((part) => part[0]).slice(0,2).join(""); }
export function makeToken() { const bytes = new Uint8Array(12); crypto.getRandomValues(bytes); return Array.from(bytes, b => b.toString(16).padStart(2,"0")).join(""); }
export function makeId() { return `SF-${Date.now().toString(36).toUpperCase()}`; }
