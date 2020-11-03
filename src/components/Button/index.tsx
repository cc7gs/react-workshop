import React from 'react';
import classNames from 'classnames'
import {} from '../../utils'
import getPrefixCls from '../../utils/getPrefix';
export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';

export type SizeType = 'small' | 'middle' | 'large' | undefined;
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

interface BaseButtonProps {
    className?: string;
    size?: SizeType;
    type?: ButtonType;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

// ref: https://github.com/ant-design/ant-design/issues/15930
export type AnchorButtonProps = {
    href?: string;
    target?: string;
    onClick: React.MouseEventHandler<HTMLElement>
} & BaseButtonProps &
    Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>;

export type NativeButtonProps = {
    htmlType?: ButtonHTMLType;
    onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
    Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;

type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button: React.FC<ButtonProps> = props => {
    const {
        type,
        size,
        icon,
        children,
        className,
        ...rest
    } = props;

    let sizeCls = '';
    switch (size) {
        case 'large':
            sizeCls = 'lg';
            break;
        case 'small':
            sizeCls = 'sm';
            break;
        default:
            break;
    }
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
        const { onClick } = props;
        // if (innerLoading) {
        //     return;
        // }
        if (onClick) {
            (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
        }
    };
    const prefixCls=getPrefixCls('btn');
    const classes = classNames(
        prefixCls,
        {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${sizeCls}`]: sizeCls,

        },
        className
    )
    const kids=children||null;

    const {htmlType,...anchorRestProps}=rest;
    if(rest.href!==undefined){
        return (
        <a {...anchorRestProps} className={classes} onClick={handleClick}>
            {kids}
        </a>
        )
    }
    return (
        <button
            className={classes}
            onClick={handleClick}
            type={htmlType}
            {...anchorRestProps}
        >
        {kids}
        </button>
    )
}
export default Button;

Button.defaultProps={
    disabled:false,
    htmlType: 'button'
}