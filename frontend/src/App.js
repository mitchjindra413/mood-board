import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import './reset.css'

import { getCurrentUser } from './store/session';

import { MainPage } from './components/MainPage/MainPage';
import { SplashPage } from './components/SplashPage/SplashPage';

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded && (
    <Switch>
      <ProtectedRoute exact path='/posts' component={MainPage}></ProtectedRoute>
      <ProtectedRoute exact path='/chart' component={MainPage}></ProtectedRoute>
      <ProtectedRoute exact path='/calendar' component={MainPage}></ProtectedRoute>
      
      <Route path="/" component={user ? MainPage : SplashPage}/>
    </Switch>
  );
}

export default App;