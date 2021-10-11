import './style.css';
import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/authContext';
import { Redirect } from 'react-router-dom';
import routes from './config/route';

function App() {
  const user = useContext(AuthContext);
  const role = user ? 'user' : 'guest';
  return (
    <>
      <BrowserRouter>
        <Header />
        <Wrapper>
          <Switch>
            {routes[role].route.map(item => (
              <Route
                key={item.path}
                exact
                path={item.path}
                component={item.component}
              />
            ))}
            <Redirect to={routes[role].redirect} />
            {/* <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/lottery-input' component={LotteryInput} />
            <Route path='/seller' component={Seller} />
            <Route path='/profile-editor' component={ProfileEditor} /> */}
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
