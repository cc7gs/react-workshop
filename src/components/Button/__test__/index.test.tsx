import React from 'react'
import {render,fireEvent, getByAltText} from '@testing-library/react'
import Button from '../index'
import { ButtonHTMLType } from 'antd/lib/button/button'


describe('button compoent',()=>{
    it('renders correctly',()=>{
        const onClick = jest.fn();
        const wrapper=render(<Button onClick={onClick}>test</Button>);
        const element=wrapper.getByText('test');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toBe('BUTTON');
        expect(element).toHaveClass('ant-btn')
        fireEvent.click(wrapper.getByText('test'));
        expect(onClick).toHaveBeenCalled();
    })

    it('should render the correct component base on different props',()=>{
        const onClick=jest.fn();
        const {getByText}=render(<Button type="link" onClick={onClick} disabled size="large"> middle</Button>);
        const element=getByText('middle') as HTMLButtonElement;
        expect(element).toHaveClass('ant-btn-lg');
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element);
        expect(onClick).not.toHaveBeenCalled();
    })

    it('should support link button',()=>{
        const {getByText}=render(<Button type="link" href="xxx"> link</Button>);
        const element=getByText('link');
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('ant-btn-link');
    })
})