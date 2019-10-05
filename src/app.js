import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Router } from "@reach/router";
import Header from './components/NavBar'
const SearchParams=lazy(()=>import('./SearchParams'));
const Details=lazy(()=>import('./Details'))

const App = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<h1>loading...</h1>}>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </Suspense>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById("root"));
