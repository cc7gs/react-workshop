import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Link } from "@reach/router";
import SearchParams from './SearchParams'
import Details from './Details'
const App = () => {
  return (
    <div>
      <header>
        <Link to="/">dopt me</Link>
      </header>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));
