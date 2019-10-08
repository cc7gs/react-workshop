import React, { ReactChildren } from 'react'
import { Switch } from '../component'
import { ReactReduxContext } from 'react-redux'

interface IProps {
    onToggle: (args: any) => void;
}
class Toggle extends React.Component<IProps>{
    static On: React.FC<any> = ({ on, children }) => <>{on ? children : null}</>
    static Off: React.FC<any> = ({ on, children }) => <>{on ? null : children}</>
    static Button: React.FC<any> = ({ on, toggle, ...props }) => (
        <Switch on={on} onClick={toggle} {...props} />
    )
    state = {
        on: false,
    }

    toggle = () => {
        this.setState({ on: !this.state.on }, () => {
            this.props.onToggle(this.state.on);
        })
    }
    render() {
       return React.Children.map(this.props.children,child=>(
           React.cloneElement(child as any,{
               on:this.state.on,
               toggle:this.toggle
           })
       ))
    }
}
function Usage() {
    const handleToggle = (args: any) => {
        console.log(args, 'click');
    }
    return (
        <Toggle onToggle={handleToggle}>
            <Toggle.On>The button is on</Toggle.On>
            <Toggle.Button />
            <Toggle.Off>The button is off</Toggle.Off>
        </Toggle>
    )
}
Usage.title = 'Compound Components'

export { Usage as default }