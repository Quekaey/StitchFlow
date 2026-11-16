import { STAGES, type Order, type ProductionStage } from "./types";
const day = (offset: number) => { const d = new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate() + offset); return d.toISOString().slice(0,10); };
const stamp = (offset: number, hour = 10) => { const d = new Date(); d.setDate(d.getDate() + offset); d.setHours(hour,15,0,0); return d.toISOString(); };
const messages: Record<ProductionStage,string> = { "Order confirmed":"Your order has been confirmed and added to our studio schedule.", "Measurements recorded":"Your measurements have been recorded and reviewed by our team.", "Fabric cut":"Your fabric has been carefully cut and is ready for sewing.", "Sewing in progress":"Our tailors are now bringing your outfit to life.", "Quality check & fitting":"Your outfit is undergoing final quality checks and fitting preparation.", "Ready for pickup":"Your outfit is complete and ready for pickup at the studio.", "Collected":"Your completed outfit has been collected. Thank you for choosing StitchFlow Studio." };
const people = [
 ["Amara Okafor","0803 555 0182","Embroidered Agbada Set","Forest green three-piece agbada with tonal embroidery",285000,150000,"Fabric cut",2],
 ["Tunde Balogun","0816 204 4471","Senator Kaftan","Navy senator set with contrast piping",145000,100000,"Sewing in progress",1],
 ["Zainab Musa","0706 330 8901","Bridal Reception Dress","Champagne beaded reception dress with detachable train",480000,300000,"Quality check & fitting",4],
 ["Chidera Nwosu","0902 117 5520","Isi Agu Set","Wine isi agu shirt with black tailored trousers",185000,90000,"Measurements recorded",9],
 ["Kemi Adebayo","0809 441 7623","Aso-ebi Corset Gown","Emerald lace corset gown with hand-finished sleeves",235000,135000,"Ready for pickup",0],
 ["Emeka Eze","0813 225 1098","Double-breasted Suit","Charcoal two-piece suit with peak lapels",320000,200000,"Sewing in progress",-2],
 ["Ifeoma Umeh","0701 918 3342","Silk Bubu","Burnt orange silk bubu with crystal neckline",165000,80000,"Order confirmed",12],
 ["Seyi Oladipo","0802 874 6610","Traditional Wedding Set","Ivory agbada and cap with gold embroidery",350000,250000,"Quality check & fitting",3],
 ["Nneka Obi","0905 421 8807","Structured Midi Dress","Chocolate structured midi dress for a corporate event",190000,95000,"Collected",-4],
 ["Bola Williams","0810 319 4476","Lace Iro & Buba","Powder blue lace iro and buba with gele",210000,150000,"Fabric cut",7],
 ["Aisha Abdullahi","0704 629 1185","Embellished Abaya","Black crepe abaya with hand-beaded cuffs",175000,100000,"Collected",-8],
 ["Damilola Adeyemi","0806 915 2034","Wedding Guest Gown","Plum draped gown with asymmetric neckline",225000,125000,"Measurements recorded",5],
] as const;
const tokens=["a7f3c92e8b4d1f60aa27e9c1","c24b9a710de84f35b8c70a44","ef901db2681c45a7bb8d20f4","1ac872ed930b4fdf987a630e","f63be8027a12456c9d33ab10","2dd0c94fa88143ecbc67e491","901ca62e31854f7bab4e1d06","bc7128ef04d64308a2f6d9c3","5e8af90c271b4d63a1c0eb79","7b132fc6e9d54a0b8c31fa62","d406c91b237a4e50af89b712","39fe8ca160bd42e7a5d091c4"];
export function seedOrders(): Order[] { return people.map((p,index)=>{ const stage=p[6] as ProductionStage, upto=STAGES.indexOf(stage), createdOffset=-18+index; return { id:`SF-${2401+index}`, trackingToken:tokens[index], customerName:p[0], phone:p[1], outfitType:p[2], description:p[3], orderDate:day(createdOffset), deliveryDate:day(p[7]), totalAmount:p[4], depositAmount:p[5], stage, createdAt:stamp(createdOffset), updatedAt:stamp(-Math.max(0,5-upto),14+(index%3)), notes:index===0?"Client prefers a relaxed fit. Matching fila in garment bag.":index===2?"Confirm final heel height at fitting.":"", history:STAGES.slice(0,upto+1).map((s,i)=>({id:`${index}-${i}`,stage:s,message:messages[s],timestamp:stamp(createdOffset+i*2,9+i)})) }; }); }
export const stageMessage=(stage:ProductionStage)=>messages[stage];
