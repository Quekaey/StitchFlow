import { DashboardShell } from "@/components/dashboard-shell";
import { Suspense } from "react";
export default function Layout({children}:{children:React.ReactNode}){return <Suspense fallback={<div className="min-h-screen bg-[#f4f1e9]"/>}><DashboardShell>{children}</DashboardShell></Suspense>}
