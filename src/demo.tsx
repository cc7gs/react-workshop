import React from 'react'
import { Button as AntButton } from 'antd'
import './index.less';

import Button from './components/Button/index';

export default function Demo() {
    return (
        <div>
            <Button type="primary" disabled>primary button</Button>
            <Button type="link" href="">link button</Button>
            <AntButton type="primary">ant btn </AntButton>
        </div>
    )
}