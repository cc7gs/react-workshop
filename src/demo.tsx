import React from 'react'
import { Button as AntButton,Menu as AntMenu, Space } from 'antd'
import './index.less';

import Button from './components/Button/index';
import Menu, { MenuItem,SubMenu } from './components/Menu/menu'

export default function Demo() {
    return (
        <div>
            <Button type="primary" disabled>primary button</Button>
            <Button type="link" href="">link button</Button>
            <AntButton type="primary">ant btn </AntButton>
            <Menu
                style={{ width: 256 }}
                mode="horizontal"
            >
                <MenuItem eventKey="1">1</MenuItem>
                <MenuItem eventKey="2">2</MenuItem>
                <SubMenu title="sub menu" eventKey="3">
                    <MenuItem eventKey="3-1">sub menu 1</MenuItem>
                    <MenuItem eventKey="3-2">sub menu 2</MenuItem>
                </SubMenu>
                <MenuItem eventKey="4">3</MenuItem>
            </Menu>
            <Space direction="horizontal" size="large" >
            <AntMenu
                 style={{ width: 256 }}
                 mode="vertical"
                 defaultOpenKeys={['sub1']}
            >
                <AntMenu.Item key="1">1</AntMenu.Item>
                <AntMenu.Item key="2">2</AntMenu.Item>
                <AntMenu.SubMenu key="sub1" title="sub menu" >
                    <AntMenu.Item key="sub1-1">sub menu 1</AntMenu.Item>
                    <AntMenu.Item key="sub1-2">sub menu 2</AntMenu.Item>
                </AntMenu.SubMenu>
                <AntMenu.Item key="3">3</AntMenu.Item>
            </AntMenu>
            </Space>
        </div>
    )
}