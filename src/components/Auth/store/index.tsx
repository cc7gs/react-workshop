import { createContext } from 'react'

const sleep=(time:number)=>new Promise((resolve)=>setTimeout(resolve,time))
export const getUser=()=>sleep(1000).then(()=>({userName:'cc'}))

export const initalUser:AuthInfo={
    status:'padding',
    error:null,
    user:null
}

interface UserResp{
    userName:string;
}
interface AuthInfo{
    status:'padding'|'error'|'success';
    error:null|string;
    user:null | UserResp
}

export const AuthContext=createContext<ReturnType<()=>AuthInfo>>(initalUser);

