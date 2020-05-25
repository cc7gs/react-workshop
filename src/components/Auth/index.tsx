import React, { useState, useEffect, useContext } from 'react'
import {initalUser,getUser,AuthContext} from './store'


export const AuthProvider:React.FC=({children})=>{
    const [state,setState]=useState(initalUser);
    useEffect(()=>{
        getUser().then(user=>{
            setState({
                status:'success',
                error:null,
                user
            })
        },
        error=>setState({status:'error',error:error,user:null})
        )
    },[]);
    return(
        <AuthContext.Provider value={state}>
            {
                state.status==='padding'?
                'padding...'
                :children
            }
        </AuthContext.Provider>
    )
}

export function useAuthState(){
    const {status,error,user}=useContext(AuthContext);
    const isSuccess=status==='success';

    return {
        user,
        isAuthenticated:user&&isSuccess,
        isPending:status==='padding',
        isError:status==='error',
        isSuccess
    }
}