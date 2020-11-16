import React from 'react'
import { Button as AntButton,Menu as AntMenu, Space } from 'antd'
import './index.less';

import Button from './components/Button/index';
import Menu, { MenuItem } from './components/Menu/menu'

export default function Demo() {
    return (
        <div>
            <Button type="primary" disabled>primary button</Button>
            <Button type="link" href="">link button</Button>
            <AntButton type="primary">ant btn </AntButton>
            <Menu
                style={{ width: 256 }}
            >
                <MenuItem eventKey="1">1</MenuItem>
                <MenuItem eventKey="2">2</MenuItem>
                <MenuItem eventKey="3">3</MenuItem>
            </Menu>
            <Space direction="horizontal"  split="-" >
            <AntMenu
                 style={{ width: 256 }}
            >
                <AntMenu.Item key="1">1</AntMenu.Item>
                <AntMenu.Item key="2">2</AntMenu.Item>
                <AntMenu.Item key="3">3</AntMenu.Item>
            </AntMenu>
            </Space>
        </div>
    )
}