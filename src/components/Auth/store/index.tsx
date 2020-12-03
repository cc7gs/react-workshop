import { createContext } from 'react'

const sleep=(time:number)=>new Promise((resolve)=>setTimeout(resolve,time))
export const getUser=()=>sleep(1000).then(()=>({userName:'cc'}))

export const initialUser:AuthInfo={
    status:'padding',
}

export interface UserResp{
    userName:string;
}
interface AuthInfo{
    status:'padding'|'error'|'success';
    error?:string;
    user?:UserResp
}

export const AuthContext=createContext<ReturnType<()=>AuthInfo>>(initialUser);

