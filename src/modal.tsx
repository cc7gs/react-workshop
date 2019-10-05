import React,{useRef,useEffect} from 'react'
import {createPortal} from 'react-dom'


const Modal:React.FC=({children})=> {
     const elRef=useRef(document.createElement('div'));
    
     useEffect(()=>{
        const modalRoot=document.getElementById('modal');
         if(!modalRoot){
             return;
         }
         modalRoot.appendChild(elRef.current);

         return ()=>{
             modalRoot.removeChild(elRef.current);
            }
     },[])
     
    return createPortal(<div>{children}</div>,elRef.current)
}
export default Modal;
