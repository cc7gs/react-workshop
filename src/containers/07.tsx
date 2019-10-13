// State Initializers

import React from 'react'
import { Switch } from '../component'

const callAll = (...fns: ((...args:any) => void)[]) => (...args: any) =>
  fns.forEach(fn => fn && fn(...args))

interface IProps {
  onToggle: (on: boolean) => void;
  initialOn:boolean;
  onReset:(on:boolean)=>void;
  children: (props: any) => any;
}
interface IState {
  on: boolean;
}
class Toggle extends React.Component<IProps,IState> {
  // 🐨 We're going to need some static defaultProps here to allow
  // people to pass a `initialOn` prop.
  //
  // 🐨 Rather than initializing state to have on as false,
  // set on to this.props.initialOn
  static defaultProps={
    initialOn:false,
    onReset:()=>{}
  }
  initalState={on:this.props.initialOn}
  state =this.initalState

  // 🐨 now let's add a reset method here that resets the state
  // to the initial state. Then add a callback that calls
  // this.props.onReset with the `on` state.
  toggle = () =>
    this.setState(
      ({ on }) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    )
  onRest=()=>{
    this.setState(this.initalState,()=>{
      this.props.onReset(this.state.on)
    })
  }
  getTogglerProps = ({ onClick=()=>{}, ...props } = {}) => {
    return {
      'aria-expanded': this.state.on,
      onClick: callAll(onClick, this.toggle),
      ...props,
    }
  }
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset:this.onRest,
      getTogglerProps: this.getTogglerProps,
    }
  }
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

function Usage({
  initialOn = false,
  onToggle = (...args:any) => console.log('onToggle', ...args),
  onReset = (...args:any) => console.log('onReset', ...args),
}) {
  return (
    <Toggle
      initialOn={initialOn}
      onToggle={onToggle}
      onReset={onReset}
    >
      {({ getTogglerProps, on, reset }) => (
        <div>
          <Switch {...getTogglerProps({ on })} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'State Initializers'

export { Toggle, Usage as default }
