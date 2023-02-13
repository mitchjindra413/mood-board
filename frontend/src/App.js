import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';

import { Calendar } from './components/Calendar/CalendarComponent';

function App() {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch])

  return loaded && (
    <Switch>
      <Route exact path="/" component={Calendar}/>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
    </Switch>
  );
}

export default App;