import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from "@reach/router";
import SearchParams from './SearchParams'
import Details from './Details'
import Header from './components/NavBar'

const App = () => {
  return (
    <div>
      <Header/>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));
