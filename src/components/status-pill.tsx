import type { Order,ProductionStage } from "@/lib/types";
import { deadlineState } from "@/lib/utils";
export function StagePill({stage}:{stage:ProductionStage}){return <span className="inline-flex rounded-full bg-[#e4eee9] px-3 py-1.5 text-[10px] font-bold text-[#285b4c]">{stage}</span>}
export function DeadlinePill({order}:{order:Order}){const state=deadlineState(order);const cls=state==="overdue"?"bg-[#f9e4df] text-[#a03b34]":state==="soon"?"bg-[#f5ead1] text-[#886827]":"bg-[#eceeea] text-[#69706c]";return <span className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold ${cls}`}>{state==="overdue"?"Overdue":state==="soon"?"Due soon":state==="complete"?"Complete":"On track"}</span>}
