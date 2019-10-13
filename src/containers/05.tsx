// prop collections

import React from 'react'
import {Switch} from '../component'

interface IProps{
  onToggle:(on:boolean)=>void;
  children:(props:any)=>any;
}
interface IState{
  on:boolean;
}

class Toggle extends React.Component<IProps,IState> {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getStateAndHelpers() {
    return {
      on: this.state.on,
      togglerProps:{
        onClick:this.toggle
      }
    }
  }
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}


function Usage({
  onToggle = (on:boolean) => console.log('onToggle',on),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, togglerProps}) => (
        <div>
          <Switch on={on} {...togglerProps} />
          <hr />
          <button aria-label="custom-button" {...togglerProps}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Prop Collections'

export {Toggle, Usage as default}
