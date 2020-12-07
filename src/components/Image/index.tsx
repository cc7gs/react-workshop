import classNames from 'classnames';
import * as React from 'react'
import { useState } from 'react';
import useTool from './hooks/useTool';

import './index.less';

interface CallBackProps {
    imgRef: React.MutableRefObject<HTMLImageElement | undefined>
}
export interface ImageProps
    extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder' | 'onClick'> {
    src: string;
    callBack?: ({ imgRef }: CallBackProps) => void;
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
    placeholder?: React.ReactNode;
    fallback?: string;
}
type ImageStatus = 'normal' | 'error' | 'loading';;



const prefixCls = 'textin-image';

const Image: React.FC<ImageProps> = ({
    src,
    height,
    width,
    style,
    wrapperClassName,
    wrapperStyle,
    placeholder,
    callBack,
    fallback,
    children,
    //Img
    crossOrigin,
    decoding,
    sizes,
    srcSet,
    useMap,
    alt,
}) => {
    const isCustomPlaceholder = placeholder && placeholder !== true;
    const [status, setStatus] = useState<ImageStatus>(isCustomPlaceholder ? 'loading' : 'normal');
    const isError = status === 'error';

    const { scale, imgRef, position, tools, rotate, onMouseDown } = useTool();



    const onLoad = () => {
        setStatus('normal');
        callBack && callBack({ imgRef });
    };
    const onError = () => {
        setStatus('error');
    };

    const getImgRef = (img?: HTMLImageElement | null) => {
        if (img) {
            imgRef.current = img;
        }
        if (status !== 'loading') return;
        if (img?.complete && (img.naturalWidth || img.naturalHeight)) {
            onLoad();
        }
    };
    const imgWrapperClass = classNames(`${prefixCls}-img-wrapper`, {
        [`${prefixCls}-error`]: isError,
    });
    const toolClassName = `${prefixCls}-operations-operation`;
    const iconClassName = `${prefixCls}-operations-icon`;
    const imgCommonProps = {
        crossOrigin,
        decoding,
        sizes,
        srcSet,
        useMap,
        alt,
        className: classNames(
            `${prefixCls}-img`,
            {
                [`${prefixCls}-img-placeholder`]: placeholder === true,
            },
        ),
        style: {
            height,
            ...style,
        },
    }


    return (
        <>
            <div className={wrapperClassName} style={wrapperStyle}>
                <div className={imgWrapperClass}
                    style={{
                        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    }}>
                    {isError && fallback ? (
                        <img {...imgCommonProps} src={fallback} />
                    ) : (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                                {...imgCommonProps}
                                onLoad={onLoad}
                                onError={onError}
                                src={src}
                                onMouseDown={onMouseDown}
                                ref={getImgRef}
                                style={{
                                    transform: `scale3d(${scale}, ${scale}, 1) rotate(${rotate}deg)`,
                                }}
                            />
                        )}
                    {React.isValidElement(children)&&React.Children.only(children) && React.cloneElement(children, {
                        style: {
                            transform: `scale3d(${scale}, ${scale}, 1) rotate(${rotate}deg)`,
                            ...children.props.style,
                            pointerEvents:'auto',
                            cursor: 'grab',
                        },
                        onMouseDown
                    })}
                    {status === 'loading' && (
                        <div aria-hidden="true" className={`${prefixCls}-placeholder`}>
                            {placeholder}
                        </div>
                    )}
                </div>
            </div>
            <ul className={`${prefixCls}-operations`}>
                {tools.map(({ Icon, onClick, type, disabled }) => (
                    <li
                        className={classNames(toolClassName, {
                            [`${prefixCls}-operations-operation-disabled`]: !!disabled,
                        })}
                        onClick={onClick}
                        key={type}
                    >
                        <Icon className={iconClassName} {... {} as any} />
                    </li>
                ))}
            </ul>
        </>
    )
}
export default Image