import classNames from 'classnames';
import React, { useState } from 'react'
import getPrefixCls from '../../utils/getPrefix';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu'
import MenuContext from './MenuContext'


export type MenuMode = 'horizontal' | 'vertical' | 'inline';

export interface MenuProps {
    defaultSelectKey?: React.Key;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: (selectIndex: React.Key) => void
};

const Menu: React.FC<MenuProps> = (props) => {
    const { className,defaultSelectKey='',onSelect, mode = 'vertical', style, children } = props;
    const [activeKey,setActiveKey]=useState(defaultSelectKey);

    const prefixCls = getPrefixCls('menu');
    const classes = classNames(prefixCls,
        `${prefixCls}-${mode}`,
        {
            [`${prefixCls}-inline-collapsed`]: false, //@TODO:
        },
        className
    );
    const handleClick=(idx:React.Key)=>{
        setActiveKey(idx);
        if(onSelect){
            onSelect(idx);
        }
    }
    const menuProps={
        activeKey:activeKey,
        onSelect:handleClick,
        mode,
    };
    return (
        <ul className={classes} style={style}>
        <MenuContext.Provider value={menuProps}>
            {children}
        </MenuContext.Provider>
        </ul>
    )
}
Menu.displayName="menu";

export {MenuItem,SubMenu,Menu as default}