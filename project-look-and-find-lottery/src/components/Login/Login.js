import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Notification from '../Notification/Notification';
import LoginBody from './LoginBody';

function Login() {
  const [error, setError] = useState('');
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  return (
    <>
      {successMessage && (
        <Notification message={successMessage} color='green' />
      )}
      {error && <Notification message={error} color='red' />}
      <LoginBody setError={setError} />
    </>
  );
}

export default Login;
