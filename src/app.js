import React from 'react'
import ReactDOM from 'react-dom'
import Pet from './Pet'

const App = () => {
  return (
    <div>
      <h1>dopt me</h1>
      <Pet
        name="Luna"
        animal="dog"
        breed="Havanes" />
    </div>
  )
}
ReactDOM.render(<App/>, document.getElementById("root"));
