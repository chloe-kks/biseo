import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./Header";
import Make from "../make/Make";

export default () => (
    <Router>
        <Header />
        <Route path="/make" component={Make} />
    </Router>
)