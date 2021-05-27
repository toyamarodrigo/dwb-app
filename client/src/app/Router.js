import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HomePage } from '../pages';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
