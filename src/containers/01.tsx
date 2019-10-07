import React,{useState} from 'react'
import {Switch} from '../component'
interface IProps{
    onToggle:(args:any)=>void
}

const Toggle:React.FC<IProps>=(props)=>{
    const [on,setOn]=useState(false);
    const handleClick=()=>{
        setOn(!on);
        props.onToggle(!on);
    }
    return(
        <Switch on={on} onClick={handleClick}/>
    )
}

function Usage() {
    const handleToggle=(args:any)=>{
        console.log(args,'click');
    }
    return (
       <Toggle onToggle={handleToggle}/>
    )
}
Usage.title = 'Build Toggle'

export {Usage as default}