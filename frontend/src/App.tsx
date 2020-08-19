import React from 'react';
import { Room } from './components/Room';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Chat } from './components/Chat';


//JSX
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Room} exact={true}></Route>
        <Route path="/chat" component={Chat} exact={true}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
