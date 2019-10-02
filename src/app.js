import React from 'react'
import ReactDOM from 'react-dom'
import Pet from './Pet'
import SearchParams from './SearchParams'

const App = () => {
  return (
    <div>
      <h1>dopt me</h1>
      <Pet
        name="Luna"
        animal="dog"
        breed="Havanes" />
        <SearchParams/>
    </div>
  )
}
ReactDOM.render(<App/>, document.getElementById("root"));
