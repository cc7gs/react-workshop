import React,{useState} from 'react'
import { RotateLeftOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { getOffset } from 'rc-util/lib/Dom/css';
import { warning } from 'rc-util/lib/warning';
import useFrameSetState from './useFrameSetState';
import getFixScaleEleTransPosition from '../getFixScaleEleTransPosition';

const initialPosition = {
    x: 0,
    y: 0,
};

export default function useTool() {
    const imgRef = React.useRef<HTMLImageElement>();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [position, setPosition] = useFrameSetState<{
        x: number;
        y: number;
    }>(initialPosition);

    const originPositionRef = React.useRef<{
        originX: number;
        originY: number;
        deltaX: number;
        deltaY: number;
    }>({
        originX: 0,
        originY: 0,
        deltaX: 0,
        deltaY: 0,
    });
    const [isMoving, setMoving] = React.useState(false);

    //img tools
    const onZoomIn = () => {
        setScale(value => value + 1);

        setPosition(initialPosition);
    };
    const onZoomOut = () => {
        if (scale > 1) {
            setScale(value => value - 1);
        }
        setPosition(initialPosition);
    };

    const onRotateRight = () => {
        setRotate(value => value + 90);
    };

    const onRotateLeft = () => {
        setRotate(value => value - 90);
    };

    const tools = [
        {
            Icon: ZoomInOutlined,
            onClick: onZoomIn,
            type: 'zoomIn',
        },
        {
            Icon: ZoomOutOutlined,
            onClick: onZoomOut,
            type: 'zoomOut',
            disabled: scale === 1,
        },
        {
            Icon: RotateRightOutlined,
            onClick: onRotateRight,
            type: 'rotateRight',
        },
        {
            Icon: RotateLeftOutlined,
            onClick: onRotateLeft,
            type: 'rotateLeft',
        },
    ];

    const onMouseUp: React.MouseEventHandler<HTMLBodyElement> = () => {
        if (isMoving&&imgRef.current) {
          const width = imgRef.current.offsetWidth * scale;
          const height = imgRef.current.offsetHeight * scale;
          const { left, top } = getOffset(imgRef.current);
          const isRotate = rotate % 180 !== 0;
    
          setMoving(false);
    
          const fixState = getFixScaleEleTransPosition(
            isRotate ? height : width,
            isRotate ? width : height,
            left,
            top,
          );
    
          if (fixState) {
            setPosition({ ...fixState });
          }
        }
      };
    const onMouseDown: React.MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        // Without this mask close will abnormal
        event.stopPropagation();
        originPositionRef.current.deltaX = event.pageX - position.x;
        originPositionRef.current.deltaY = event.pageY - position.y;
        originPositionRef.current.originX = position.x;
        originPositionRef.current.originY = position.y;
        setMoving(true);
      };
      const onMouseMove: React.MouseEventHandler<HTMLBodyElement> = event => {
        if (isMoving) {
          setPosition({
            x: event.pageX - originPositionRef.current.deltaX,
            y: event.pageY - originPositionRef.current.deltaY,
          });
        }
      };
      React.useEffect(() => {
        let onTopMouseUpListener:any;
        let onTopMouseMoveListener:any;
        // let imgContainer=document.querySelector('.fileView');
        // if(!imgContainer){
        //     return;
        // }
        const onMouseUpListener = addEventListener(window, 'mouseup', onMouseUp, false);
        const onMouseMoveListener = addEventListener(window, 'mousemove', onMouseMove, false);
    
        return () => {
          onMouseUpListener.remove();
          onMouseMoveListener.remove();
    
          /* istanbul ignore next */
          if (onTopMouseUpListener) onTopMouseUpListener.remove();
          /* istanbul ignore next */
          if (onTopMouseMoveListener) onTopMouseMoveListener.remove();
        };
      }, [isMoving]);

    return {
        imgRef,
        tools,
        scale,
        rotate,
        position,
        onMouseDown,
        setPosition
    }
}