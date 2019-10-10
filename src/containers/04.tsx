
import React from 'react'
import {Switch} from '../component'

interface IProps {
  onToggle: (arg: any) => void;
  children:(args:any)=>any
}


class Toggle extends React.Component<IProps> {
  state = {on: false}
  toggle = () =>
    this.setState(
      {on:!this.state.on},
      () => {
        this.props.onToggle(this.state.on)
      },
    )
    getStateAndHelpers(){
      return{
        on:this.state.on,
        toggle:this.toggle

      }
    }
  render() {
    const {on} = this.state
    // We want to give rendering flexibility, so we'll be making
    // a change to our render prop component here.
    // You'll notice the children prop in the Usage component
    // is a function. 🐨 So you can replace this with a call this.props.children()
    // But you'll need to pass it an object with `on` and `toggle`.
    return this.props.children(this.getStateAndHelpers())
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (args:any) => console.log('onToggle', args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, toggle})=> (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'Render Props'

export {Toggle, Usage as default}
