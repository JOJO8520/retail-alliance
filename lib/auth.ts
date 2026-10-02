import {cookies} from "next/headers"; import {prisma} from "./prisma";
export async function getSessionUser(){const c=await cookies();const w=c.get("retail_wallet")?.value?.toLowerCase();return w?prisma.user.findUnique({where:{wallet:w}}):null}
export const session=(wallet:string)=>({name:"retail_wallet",value:wallet.toLowerCase(),httpOnly:true,sameSite:"lax" as const,secure:process.env.NODE_ENV==="production",path:"/",maxAge:2592000});
