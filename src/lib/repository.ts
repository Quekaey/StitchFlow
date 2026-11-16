import { seedOrders, stageMessage } from "./seed";
import type { Order, OrderInput, ProductionStage } from "./types";
import { makeId, makeToken } from "./utils";
const KEY="stitchflow.orders.v1";
export const orderRepository={
 list():Order[]{if(typeof window==="undefined")return[];const saved=localStorage.getItem(KEY);if(saved){try{return JSON.parse(saved) as Order[]}catch{}}const seeded=seedOrders();this.save(seeded);return seeded},
 save(orders:Order[]){localStorage.setItem(KEY,JSON.stringify(orders))}, reset(){const seeded=seedOrders();this.save(seeded);return seeded},
 create(input:OrderInput){const now=new Date().toISOString();const order:Order={...input,id:makeId(),trackingToken:makeToken(),createdAt:now,updatedAt:now,history:[{id:crypto.randomUUID(),stage:input.stage,message:stageMessage(input.stage),timestamp:now}]};this.save([order,...this.list()]);return order},
 update(id:string,patch:Partial<Order>){const orders=this.list(),current=orders.find(o=>o.id===id);if(!current)throw new Error("Order not found");const updated={...current,...patch,updatedAt:new Date().toISOString()};this.save(orders.map(o=>o.id===id?updated:o));return updated},
 updateStage(id:string,stage:ProductionStage,message:string){const order=this.list().find(o=>o.id===id);if(!order)throw new Error("Order not found");const now=new Date().toISOString();return this.update(id,{stage,history:[...order.history,{id:crypto.randomUUID(),stage,message,timestamp:now}]})}
};
