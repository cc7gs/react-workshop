import React, { useRef, useState } from 'react'
import { Image as AntdImg, Space } from 'antd';
import { useUpdateEffect,useSize } from 'ahooks'
import Image, { ImageProps } from '../components/Image'
import './index.less'

const fallBack = 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NZuwQp_vcIQAAAAAAAAAAABkARQnAQ';
const imgUrls = [
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ',
    'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ',
    ''
]
const MainImageView: React.FC<{ url: string } & Omit<ImageProps, 'src'>> = ({ url, ...props }) => {
    return (
        <div className="fileView">
            <div className="fileName">1.png</div>
            <Image
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%'
                }}
                wrapperClassName="fileMain"
                fallback={fallBack}
                {...props}
                // placeholder={<div>loading....</div>}
                src={url}
            />
        </div>
    )
}

export default () => {
    const [idx, setIdx] = useState(0);
    const [position,setPosition]=useState({left:0,top:0});
    const containerRef = useRef();
    const size = useSize(containerRef);
    const imgRef = useRef<HTMLImageElement>();

    useUpdateEffect(() => {
        if(!imgRef.current) return;
        setPosition({
            left:imgRef.current.offsetLeft,
            top:imgRef.current.offsetTop
        })
    }, [size]);

    const handleNext = () => {
        if (idx < imgUrls.length) {
            setIdx(idx + 1);
        }
    }
    const handlePrev = () => {
        if (idx > 0) {
            setIdx(idx - 1);
        }
    }

    const imgStyle:React.CSSProperties={
        position: 'absolute',
        textAlign:'left',
        width:imgRef.current?.width??'auto',
        height:imgRef.current?.height??'auto',
        ...position
    }

    return (
        <div className="container">
            <div className="leftBar">
                <AntdImg
                    style={{
                        width: 400,
                    }}
                    fallback={fallBack}
                    src={imgUrls[idx]}
                />
            </div>
            <div ref={containerRef} className="mainContent">
                <MainImageView url={imgUrls[idx]} callBack={(props) => {
                    imgRef.current = props.imgRef.current;
                    setPosition({
                        left:imgRef.current.offsetLeft,
                        top:imgRef.current.offsetTop
                    })
                }}>
                    <div style={imgStyle}>img svg</div>
                </MainImageView>
            </div>
            <div className="rightBar">
                <img src={imgUrls[idx]} width={200} alt="" />
                <Space size="large">
                    <button onClick={handleNext}>next img</button>
                    <button onClick={handlePrev}>prev img</button>
                </Space>
            </div>
        </div>
    )
}
