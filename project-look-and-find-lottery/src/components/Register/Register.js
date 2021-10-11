import { useState } from 'react';
import Notification from '../Notification/Notification';
import RegisterBody from './RegisterBody';

function Register() {
  const [error, setError] = useState('');
  return (
    <>
      {error && <Notification message={error} />}
      <RegisterBody setError={setError} />
    </>
  );
}

export default Register;
