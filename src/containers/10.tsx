// Control Props + with a state reducer

import React from 'react'
import { Switch } from '../component'

const callAll = (...fns:any[]) => (...args:any) =>
  fns.forEach(fn => fn && fn(...args))
interface IProps{
  [key:string]:any;
  on:boolean;
  onStateChange:(changes:any)=>void;
  children:(props:any)=>any
}

interface IChanges{
  type:string;
  on:boolean;
}

type ObjectKeys={
  [key:string]:any;
}

class Toggle extends React.Component<IProps,any> {
  static defaultProps = {
    initialOn: false,
    onReset: () => { },
    onToggle: () => { },
    onStateChange: () => { },
    stateReducer: (state:any, changes:IChanges) => changes,
  }
  static stateChangeTypes = {
    reset: '__toggle_reset__',
    toggle: '__toggle_toggle__',
  }
  initialState = { on: this.props.initialOn }
  state = this.initialState
  
  isControlled(prop:string) {
    return this.props[prop] !== undefined
  }

  getState(state = this.state) {
    return Object.entries(state).reduce((combineState, [key, value]) => {
      if (this.isControlled(key)) {
        combineState[key] = this.props[key]
      } else {
        combineState[key] = value;
      }
      return combineState
    }, {} as ObjectKeys)
  }

  internalSetState(changes:any, callback:()=>void) {
    let allChanges:any;
    this.setState((state:any) => {
      const combinState = this.getState(state);

      const changesObject =
        typeof changes === 'function' ? changes(combinState) : changes

      allChanges =
        this.props.stateReducer(combinState, changesObject) || {}

      // remove the type so it's not set into state
      const { type: ignoredType, ...onlyChanges } = allChanges

      const nonControlledChanges = Object.keys(combinState).reduce((newChanges, stateKey) => {
        if(!this.isControlled(stateKey)){
            newChanges[stateKey]=onlyChanges.hasOwnProperty(stateKey)
            ?onlyChanges[stateKey]
            :combinState[stateKey]
        }
        return newChanges
      }, {} as ObjectKeys)

      // return null if there are no changes to be made
      return Object.keys(nonControlledChanges || {}).length
        ? nonControlledChanges
        : null

    },()=>{
      this.props.onStateChange(allChanges)
      callback()
    })
  }

  reset = () =>
    this.internalSetState(
      { ...this.initialState, type: Toggle.stateChangeTypes.reset },
      () => this.props.onReset(this.getState().on),
    )
  toggle = ({ type = Toggle.stateChangeTypes.toggle } = {}) =>
    this.internalSetState(
      ({ on }:any) => ({ type, on: !on }),
      () => this.props.onToggle(this.getState().on),
    )
  getTogglerProps = ({ onClick=null, ...props } = {}) => ({
    onClick: callAll(onClick, () => this.toggle()),
    'aria-expanded': this.getState().on,
    ...props,
  })
  getStateAndHelpers() {
    return {
      on: this.getState().on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    }
  }
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

 
interface UsageState{
  timesClicked:number;
  toggleOn:boolean;
}
class Usage extends React.Component<any,UsageState> {
  static defaultProps = {
    onToggle: (...args:any) => console.log('onToggle', ...args),
    onReset: (...args:any) => console.log('onReset', ...args),
  }
  initialState = { timesClicked: 0, toggleOn: false }
  state = this.initialState
  handleStateChange = (changes:IChanges) => {
    if (changes.type === 'forced') {
      this.setState({ toggleOn: changes.on }, () =>
        this.props.onToggle(this.state.toggleOn),
      )
    } else if (changes.type === Toggle.stateChangeTypes.reset) {
      this.setState(this.initialState, () => {
        this.props.onReset(this.state.toggleOn)
      })
    } else if (changes.type === Toggle.stateChangeTypes.toggle) {
      this.setState(
        ({ timesClicked }) => ({
          timesClicked: timesClicked + 1,
          toggleOn: timesClicked >= 4 ? false : changes.on,
        }),
        () => {
          this.props.onToggle(this.state.toggleOn)
        },
      )
    }
  }
  render() {
    const { timesClicked, toggleOn } = this.state
    return (
      <Toggle
        on={toggleOn}
        onStateChange={this.handleStateChange}
        ref={this.props.toggleRef}
      >
        {({ on, toggle, reset, getTogglerProps }) => (
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
                <button onClick={() => toggle({ type: 'forced' })}>
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
(Usage as any).title = 'Control Props with State Reducers'

export { Toggle, Usage as default }

