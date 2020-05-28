import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Admin } from './components/Admin';
import { Main } from './components/Main';
import { Chat } from './components/Chat';
import { Test } from './components/Test';

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Main}/>
				<Route path="/chat" component={Chat}/>
                <Route path="/admin" component={Admin}/>
				<Route path="/test" component={Test}/>
            </div>
        );
    }
}

export default App;
