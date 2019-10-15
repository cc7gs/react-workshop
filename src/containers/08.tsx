// state reducer

import React from 'react'
import { Switch } from '../component'

const callAll = (...fns: any[]) => (...args: any) =>
  fns.forEach(fn => fn && fn(...args))

// Render props allow users to be in control over the UI based on state.
// State reducers allow users to be in control over logic based on actions.
// This idea is similar to redux, but only coincidentally.
//
// The basic idea is that any time there's an internal change in state, we
// first call a stateReducer prop with the current state and the changes.
// Whatever is returned is what we use in our setState call.
// This allows users of the component to return the changes they received
// or to modify the changes as they need.
//
// What this means for our implementation is that we can create a single
// function that does all the work before calling setState. Then we can
// replace all calls to setState with that function.
interface IProps {
  onToggle: (on: boolean) => void;
  initialOn: boolean;
  onReset: (on: boolean) => void;
  children: (props: any) => any;
  stateReducer: (state: any, changes: any) => any
}
interface IState {
  on: boolean;
}

class Toggle extends React.Component<IProps, IState> {
  static defaultProps = {
    initialOn: false,
    onReset: () => { },
    // 🐨 let's add a default stateReducer here. It should return
    // the changes object as it is passed.
    stateReducer: (state: any, changes: any) => changes
  }
  initialState = { on: this.props.initialOn }
  state = this.initialState

  inernalSetState(changes: any, callback: () => void) {
    this.setState((state) => {
      // handle function setState call
      const changeObject =
        typeof changes === 'function' ? changes(state) : changes

      // state reducer
      const reducerChange =
        this.props.stateReducer(state, changeObject) || {}

      return (
        Object.keys(reducerChange).length
          ? reducerChange
          : null
      )
    }, callback)
  }
//internalSetState
  // internalSetState(changes:any,callback:()=>void){
  //   this.setState(currState=>{
  //     return [changes]
  //           .map(c=>typeof c==='function'?c(currState):c)
  //           .map(c=>this.props.stateReducer(currState,c)||{})
  //           .map(c=>Object.keys(c).length?c:null)[0]

  //   },callback)
  // }
  
  reset = () =>
    this.inernalSetState(this.initialState, () =>
      this.props.onReset(this.state.on),
    )
  toggle = () =>
    this.inernalSetState(
      ({ on }:IState) => ({ on: !on }),
      () => this.props.onToggle(this.state.on),
    )
  getTogglerProps = ({ onClick = null, ...props } = {}) => ({
    onClick: callAll(onClick, this.toggle),
    'aria-expanded': this.state.on,
    ...props,
  })
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    }
  }
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

interface UsageState {
  readonly timesClicked: number
}

class Usage extends React.Component<any, UsageState> {
  static defaultProps = {
    onToggle: (...args: any) => console.log('onToggle', args),
    onReset: (on: boolean) => console.log('onReset', on),
  }
  initialState = { timesClicked: 0 }
  state = this.initialState
  handleToggle = (...args: any) => {
    this.setState(({ timesClicked }) => ({
      timesClicked: timesClicked + 1,
    }))
    this.props.onToggle(...args)
  }
  handleReset = (...args: any) => {
    this.setState(this.initialState)
    this.props.onReset(...args)
  }
  toggleStateReducer = (state: UsageState, changes: any) => {
    if (this.state.timesClicked >= 4) {
      return { ...changes, on: false }
    }
    return changes
  }
  render() {
    const { timesClicked } = this.state
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
      >
        {toggle => (
          <div>
            <Switch
              {...toggle.getTogglerProps({
                on: toggle.on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">
                Click count: {timesClicked}
              </div>
            ) : null}
            <button onClick={toggle.reset}>Reset</button>
          </div>
        )}
      </Toggle>
    )
  }
}
(Usage as any).title = 'State Reducers'

export { Toggle, Usage as default }

