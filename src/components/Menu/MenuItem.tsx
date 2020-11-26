import classNames from 'classnames';
import React,{useContext} from 'react'
import MenuContext from './MenuContext'
import getPrefixCls from '../../utils/getPrefix';

export interface MenuItemProps{
    disabled?:boolean; 
    eventKey:React.Key;
    danger?: boolean;
    title?: React.ReactNode
    className?:string;
    style?:React.CSSProperties;
}

const MenuItem:React.FC<MenuItemProps>=({
    disabled,
    className,
    children,
    title,
    style,
    eventKey,
    ...props
})=>{
    const {activeKey,onSelect}=useContext(MenuContext);
    const prefixCls = getPrefixCls('menu-item');
    const classes=classNames(prefixCls,className,{
        [`${prefixCls}-active`]:eventKey===activeKey,
        [`${prefixCls}-selected`]:eventKey===activeKey,
        [`${prefixCls}-disabled`]:disabled
    })
    const handleClick=()=>{
        if(onSelect&&!disabled){
            onSelect(eventKey);
        }
    }
    return (
        <li className={classes} key={eventKey} onClick={handleClick} style={style}>
            {children}
        </li>
    )
}
MenuItem.displayName="menuItem";

export default MenuItem;
