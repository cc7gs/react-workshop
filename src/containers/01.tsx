import React, { useState } from 'react'
import { Switch } from '../component'
interface IProps {
    onToggle: (args: any) => void
}

type IState = Readonly<{
    on: boolean;
}>;


/**
 * 1. 使用函数组件(hooks)
 */

// const Toggle:React.FC<IProps>=(props)=>{
//     const [on,setOn]=useState(false);
//     const handleClick=()=>{
//         setOn(!on);
//         props.onToggle(!on);
//     }
//     return(
//         <Switch on={on} onClick={handleClick}/>
//     )
// }


/**
 * 2. 使用 class Component
 */
class Toggle extends React.Component<IProps, IState>{
    state = {
        on: false
    }
    handleClick = () => {
        this.setState(({ on }) => ({ on: !on }), () => {
            //callback
            this.props.onToggle(this.state.on);
        })
    }
    render() {
        const { on } = this.state
        return (
            <Switch on={on} onClick={this.handleClick} />
        )
    }
}

function Usage() {
    const handleToggle = (args: any) => {
        console.log(args, 'click');
    }
    return (
        <Toggle onToggle={handleToggle} />
    )
}
Usage.title = 'Build Toggle'

export { Usage as default }