import React, { useState } from 'react'
import { Image as AntdImg, Space } from 'antd'
import { Image } from '../components'
import './index.less'

const fallBack='https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NZuwQp_vcIQAAAAAAAAAAABkARQnAQ';
const imgUrls=[
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ',
    'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ',
    ''
]
function MainImageView({url}:any) {
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
                // placeholder={<div>loading....</div>}
                src={url}
            />
        </div>
    )
}

export default () => {
    const [idx,setIdx]=useState(0);
    const handleNext=()=>{
        if(idx<imgUrls.length){
            setIdx(idx+1);
        }
    }
    const handlePrev=()=>{
        if(idx>0){
            setIdx(idx-1);
        }
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
            <div className="mainContent">
                <MainImageView  url={imgUrls[idx]}/>
            </div>
            <div className="rightBar">
                <img src={imgUrls[idx]} width={200} alt=""/>
                <Space size="large">
                <button onClick={handleNext}>next img</button>
                <button onClick={handlePrev}>prev img</button>
                </Space>
            </div>
        </div>
    )
}
