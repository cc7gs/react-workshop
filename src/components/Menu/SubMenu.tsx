import classNames from 'classnames';
import React, { FunctionComponentElement, useContext, useState } from 'react'
import { MenuItemProps } from './MenuItem';
import MenuContext from './MenuContext'
import getPrefixCls from '../../utils/getPrefix';

export interface SubMenuProps {
    disabled?: boolean;
    eventKey?: React.Key;
    title?: React.ReactNode
    className?: string;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
}

const SubMenu: React.FC<SubMenuProps> = ({
    title,
    className,
    eventKey,
    disabled,
    icon,
    children
}) => {
    const [isOpen, setOpen] = useState(false);
    const { activeKey, onSelect, mode } = useContext(MenuContext);

    const prefixCls = getPrefixCls('menu-submenu');
    const classes = classNames(prefixCls,
        `${prefixCls}-${mode}`,
        className,
        {
            [`${prefixCls}-active`]: eventKey === activeKey,
            [`${prefixCls}-selected`]: eventKey === activeKey,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-open`]: isOpen,
        });

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'menuItem') {
                //@TODO: 临时加入样式
                return React.cloneElement(childElement, {
                    eventKey:`${eventKey}-${index}`, 
                    style: mode!=='horizontal'?{ paddingLeft: 48 }:{} 
                })
            } else {
                console.error(`It's not Menu Item`);
            }
        })
        if (!isOpen) {
            return <div />;
        }

        return (
            <ul className={classNames(
                'ant-menu',
                'ant-menu-sub',
                `ant-menu-${mode}`,
            )}>
                {childrenComponent}
            </ul>
        )
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!isOpen);
    }
    let timer:any;

    const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
        timer&&clearTimeout(timer);
        timer=setTimeout(() => {
            setOpen(toggle);
        }, 300);
    }
    let titleClickEvents = {};
    let titleMouseEvents = {};
    if (!disabled) {
        titleClickEvents = {
            onClick: handleClick
        }
        if(mode!=='inline'){
            titleMouseEvents={
                onMouseEnter:(e:React.MouseEvent)=>handleMouse(e,true),
                onMouseLeave:(e:React.MouseEvent)=>handleMouse(e,false)
            }
        }
    }
    return (
        <li className={classes} {...titleMouseEvents} key={eventKey} role="menuitem">
            <div
                className={`${prefixCls}-title`}
                {...titleClickEvents}
                role="button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                title={typeof title === 'string' ? title : undefined}
            >
                {title}
                {icon || <i className={'ant-menu-submenu-arrow'} />}
            </div>
            {/* @TODO: 临时加入样式 */}
            <div style={mode==='horizontal'?{position:'absolute'}:{}}>
            {renderChildren()}
            </div>
        </li>
    )
}
SubMenu.displayName = "subMenu";

export default SubMenu