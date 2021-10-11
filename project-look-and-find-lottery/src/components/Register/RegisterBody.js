import '../../style.css';
import axios from '../../config/axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { scroller } from 'react-scroll';

function RegisterBody({ setError }) {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();

  const handleClickToLoginPage = () => {
    history.push('/login');
  };

  const handleSubmitRegister = e => {
    e.preventDefault();
    axios
      .post('/register', {
        username,
        phone,
        email,
        password,
        confirmPassword,
      })
      .then(() => {
        history.push({
          pathname: '/login',
          state: {
            successMessage: 'your account has been created',
          },
        });
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          setError(err.response.data.message);
          scroller.scrollTo('noti', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
          });
        }
      });

    // const formData = new FormData(); //สร้าง body ในรูปแบบ multipart/form-data
    // formData.append('username', username);
    // formData.append('phone', phone);
    // formData.append('email', email);
    // formData.append('password', password);
    // formData.append('confirmPassword', confirmPassword);
  };
  return (
    <div className='register_area'>
      <div className='register_field'>
        <div className='label_register_style'>
          <label htmlFor='' className='label_register'>
            สมัครสมาชิก
          </label>
        </div>
        <form
          action=''
          className='form_register'
          onSubmit={handleSubmitRegister}>
          <div className='register_div_label label_register_username'>
            <label htmlFor=''>ชื่อผู้ใช้งาน</label>
          </div>
          <div className='register_div_input div_register_username'>
            <input
              type='text'
              placeholder='ใส่ชื่อผู้ใช้งาน'
              className='register_username'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='register_div_label label_register_phone'>
            <label htmlFor=''>เบอร์โทรศัพท์</label>
          </div>
          <div className='register_div_input div_register_phone'>
            <input
              type='text'
              placeholder='ใส่เบอร์โทรศัพท์'
              className='register_phone'
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className='register_div_label label_register_email'>
            <label htmlFor=''>อีเมล์</label>
          </div>
          <div className='register_div_input div_username'>
            <input
              type='text'
              placeholder='example@email.com'
              className='register_email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='register_div_label label_register_password'>
            <label htmlFor=''>รหัสผ่าน</label>
          </div>
          <div className=' div_register_password'>
            <input
              type='password'
              placeholder='ใส่รหัสผ่าน'
              className='register_password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='register_div_label label_register_confirm_password'>
            <label htmlFor=''>ยืนยันรหัสผ่าน</label>
          </div>
          <div className=' div_password'>
            <input
              type='password'
              placeholder='ใส่รหัสผ่านอีกครั้ง'
              className='register_confirm_password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='div_register_button_register'>
            <button type='submit' className='button_register_register_page'>
              สมัครสมาชิก
            </button>
          </div>
        </form>
        <div className='div_register_button_login'>
          <button
            className='button_login_register_page'
            onClick={handleClickToLoginPage}>
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterBody;
