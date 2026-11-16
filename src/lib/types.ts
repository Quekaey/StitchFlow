export const STAGES = ["Order confirmed", "Measurements recorded", "Fabric cut", "Sewing in progress", "Quality check & fitting", "Ready for pickup", "Collected"] as const;
export type ProductionStage = (typeof STAGES)[number];
export type StatusUpdate = { id: string; stage: ProductionStage; message: string; timestamp: string };
export type Order = { id: string; trackingToken: string; customerName: string; phone: string; outfitType: string; description: string; orderDate: string; deliveryDate: string; totalAmount: number; depositAmount: number; stage: ProductionStage; createdAt: string; updatedAt: string; notes: string; history: StatusUpdate[] };
export type OrderInput = Omit<Order, "id" | "trackingToken" | "createdAt" | "updatedAt" | "history">;
