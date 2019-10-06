import React, { lazy, Suspense } from 'react'
import { Router } from "@reach/router";
import {Provider} from 'react-redux'
import store from './store'
import Header from './components/NavBar'
import SearchParams from './SearchParams';
import Details from './Details'

// const SearchParams=lazy(()=>import('./SearchParams'));
// const Details=lazy(()=>import('./Details'))

//@todo clinet server 
//Invariant Violation: ReactDOMServer does not yet support Suspense.
// link https://reactjs.org/docs/code-splitting.html#reactlazy

const App = () => {
  return (
    <>
     {/* <Provider store={store}> */}
      <Header />
      {/* <Suspense fallback={<h1>loading...</h1>}> */}
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      {/* </Suspense> */}
    {/* </Provider> */}
    </>
  )
}
export default App;