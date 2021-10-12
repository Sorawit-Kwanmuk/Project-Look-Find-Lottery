import axios from '../../config/axios';
import jwtDecode from 'jwt-decode';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { LotteryContext } from '../../contexts/lotteryContext';
import { setToken, getToken } from '../../services/localStorage';
import '../../style.css';

function LoginBody({ setError }) {
  //login รับค่ามาจาก ช่อง input ช่องเดียว ตองจำแนกค่าโดยการนำค่า string  ที่ได้จาก input ไปแปลงค่าเป็น number ถ้าแปลงค่าแล้วได้เป็นตัวเลข
  //แสดงว่าค่านั้นเป็น phone แต่ถ้าแปลงค่านั้นได้เป็น NaN แสดงว่าค่านั้นเป็น username
  const [usernameOrPhone, setUsernameOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(AuthContext);
  const { lottery, setLottery } = useContext(LotteryContext);

  const history = useHistory();

  const handleSubmitLogin = async e => {
    e.preventDefault();
    console.log('User', user);
    try {
      if (isNaN(+usernameOrPhone)) {
        // console.log(usernameOrPhone);
        console.log(usernameOrPhone);
        const res = await axios.post('/login', {
          username: usernameOrPhone,
          password: password,
        });
        setToken(res.data.token);
        setUser(jwtDecode(res.data.token));
        const fetchDataFromProfile = async () => {
          try {
            const result = await axios.get(`/profiles/${user.id}`);
            console.log('result: ', result);
            setLottery(result);
          } catch (error) {
            console.log(error);
          }
        };
        fetchDataFromProfile();

        history.replace('/');
      } else if (!isNaN(+usernameOrPhone)) {
        console.log(usernameOrPhone);
        const res = await axios.post('/login', {
          phone: usernameOrPhone,
          password: password,
        });
        setToken(res.data.token);
        const fetchDataFromProfile = async () => {
          try {
            const result = await axios.get(`/profiles/${user.id}`);
            console.log('result: ', result);
            setLottery(result);
          } catch (error) {
            console.log(error);
          }
        };
        fetchDataFromProfile();
        // setUser(res.data.token);
        history.replace('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className='login_area'>
      <div className='login_field'>
        <div className='label_login_style'>
          <label className='label_login'>เข้าสู่ระบบ</label>
        </div>
        <form action='' className='form_login' onSubmit={handleSubmitLogin}>
          <div className='login_div_label label_username'>
            <label>ชื่อผู้ใช้งาน/เบอร์โทรศัพท์</label>
          </div>
          <div className='login_div_input div_username'>
            <input
              type='text'
              placeholder='ใส่ชื่อผู้ใช้งาน หริอ เบอร์โทรศัพท์'
              className='input_username'
              value={usernameOrPhone}
              onChange={e => setUsernameOrPhone(e.target.value)}
            />
          </div>
          <div className='login_div_label label_password'>
            <label>รหัสผ่าน</label>
          </div>
          <div className=' div_password'>
            <input
              type='password'
              placeholder='ใส่รหัสผ่าน'
              className='input_password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='div_button_login'>
            <button type='submit' className='button_login'>
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
        <div className='div_button_register'>
          <button className='button_register'>สมัครสมาชิก</button>
        </div>
      </div>
    </div>
  );
}

export default LoginBody;
