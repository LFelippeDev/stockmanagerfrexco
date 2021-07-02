import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login/index';
import { Items } from './pages/Items/index';
import { Stocks } from './pages/Stocks/index';

import '../app/styles/global.scss';
import { token } from '../app/common/common';
import { useEffect } from 'react';

type PrivateProps = {
  component: any;
};
function App() {
  function isAuthenticated() {
    if (token.headers.authorization === undefined) {
      return false;
    }
    return true;
  }

  const PrivateRoute: any = ({
    component: Component,
    ...rest
  }: PrivateProps) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
  useEffect(() => {
    isAuthenticated();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/items" component={Items} />
        <PrivateRoute path="/stocks" component={Stocks} />
        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
