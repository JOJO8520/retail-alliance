 "use client";
import {createContext,useContext,useEffect,useState} from "react";
const C=createContext<any>({address:null,connect:async()=>{},disconnect:()=>{},loading:false});
declare global{interface Window{ethereum?:any}}
export function WalletProvider({children}:{children:React.ReactNode}){const[address,setAddress]=useState<string|null>(null);const[loading,setLoading]=useState(false);
useEffect(()=>{const s=localStorage.getItem("retail_wallet");if(s)setAddress(s);const e=window.ethereum;if(!e)return;const f=(a:string[])=>{if(a?.[0]){setAddress(a[0]);localStorage.setItem("retail_wallet",a[0])}else{setAddress(null);localStorage.removeItem("retail_wallet")}};e.on?.("accountsChanged",f);return()=>e.removeListener?.("accountsChanged",f)},[]);
async function connect(){if(!window.ethereum){alert("未检测到钱包，请安装 MetaMask 或使用支持钱包的浏览器。");return}setLoading(true);try{const a=(await window.ethereum.request({method:"eth_requestAccounts"}))[0];const n=await fetch("/api/auth/nonce",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({wallet:a})});const{message,nonce}=await n.json();const sig=await window.ethereum.request({method:"personal_sign",params:[message,a]});const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({wallet:a,nonce,signature:sig})});if(!r.ok)throw Error("签名验证失败");localStorage.setItem("retail_wallet",a);setAddress(a);location.reload()}catch(e:any){alert(e?.message||"钱包连接失败")}finally{setLoading(false)}}
function disconnect(){localStorage.removeItem("retail_wallet");fetch("/api/auth/logout",{method:"POST"}).finally(()=>location.reload())}
return <C.Provider value={{address,connect,disconnect,loading}}>{children}</C.Provider>}
export const useWallet=()=>useContext(C);
