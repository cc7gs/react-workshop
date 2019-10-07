import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import { Home, FullPage } from './containers'

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:pageId"
                    render={(props) => <FullPage {...props} type={'comp'} />} />
            </Switch>
        </Router>
    );
}


export default App;
