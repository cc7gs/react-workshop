// state reducer with types

import React from 'react'
import {Switch} from '../component'

const callAll = (...fns:any[]) => (...args:any) =>
  fns.forEach(fn => fn && fn(...args))

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
  
class Toggle extends React.Component<IProps,IState> {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state:IState, changes:any) => changes,
  }
  static stateChangeProps={
    toggle:'__toggle__',
    reset:'__reset__'
  }
  initialState = {on: this.props.initialOn}
  state = this.initialState
  internalSetState(changes:any, callback:()=>void) {
    this.setState(state => {
      // handle function setState call
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes
      // apply state reducer
      const reducedChanges =
        this.props.stateReducer(state, changesObject) || {}
      // 🐨  in addition to what we've done, let's pluck off the `type`
      // property and return an object only of the state changes
      // 💰 to remove the `type`, you can destructure the changes:
      // `{type, ...c}`
      const {type:ignoredType,...remainingChanges}=reducedChanges;

      return Object.keys(remainingChanges).length
        ? reducedChanges
        : null
    }, callback)
  }
  reset = () =>
    this.internalSetState({type:Toggle.stateChangeProps.reset,...this.initialState}, () =>
      this.props.onReset(this.state.on),
    )
  toggle = ({type=Toggle.stateChangeProps.toggle}={}) =>
    this.internalSetState(
      ({on}:IState) => ({type,on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getTogglerProps = ({onClick=null, ...props} = {}) => ({
    
    //avoid passing the click event to this toggle

    onClick: callAll(onClick, ()=>this.toggle()),
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

class Usage extends React.Component<any,UsageState> {
  static defaultProps = {
    onToggle: (...args:any) => console.log('onToggle', ...args),
    onReset: (...args:any) => console.log('onReset', ...args),
  }
  initialState = {timesClicked: 0}
  state = this.initialState
  handleToggle = (...args:any) => {
    this.setState(({timesClicked}) => ({
      timesClicked: timesClicked + 1,
    }))
    this.props.onToggle(...args)
  }
  handleReset = (...args:any) => {
    this.setState(this.initialState)
    this.props.onReset(...args)
  }
  toggleStateReducer = (state:any, changes:any) => {
    if (changes.type === 'forced') {
      return changes
    }
    if (this.state.timesClicked >= 4) {
      return {...changes, on: false}
    }
    return changes
  }
  render() {
    const {timesClicked} = this.state
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
        ref={this.props.toggleRef}
      >
        {({on, toggle, reset, getTogglerProps}) => (
          <div>
            <Switch
              {...getTogglerProps({
                on: on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({type: 'forced'})}>
                  Force Toggle
                </button>
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">
                Click count: {timesClicked}
              </div>
            ) : null}
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Toggle>
    )
  }
}
(Usage as any).title = 'State Reducers (with change types)'

export {Toggle, Usage as default}

