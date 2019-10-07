import React from 'react'
import './swith.styles.css'

interface IProps{
    on:boolean;
    onClick:()=>void;
    className?:string;
}

const Switch:React.FC<IProps>=(props)=>{
    const {on,className='',...otherProps}=props;
    const btnClassName=[
        className,
        'toggle-btn',
        on?'toggle-btn-on':'toggle-btn-off'
    ]
    .filter(Boolean)
    .join(' ');
    return(
        <div>
            <button
             className={btnClassName}
             aria-label='Toggle'
             {...otherProps}
            />
        </div>
    )
}

export {Switch}