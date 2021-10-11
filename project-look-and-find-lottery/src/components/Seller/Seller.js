import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import '../../style.css';
import Lottery_ticket_Edit from '../LotteryTicket/Lottery_ticket_Edit';
import { Link } from 'react-router-dom';

function Seller() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    lineId: '',
    facebookId: '',
    location: '',
    etc: '',
    imageProfile: '',
    qrCodeLine: '',
  });

  useEffect(() => {
    const fetchDataFromProfile = async () => {
      try {
        const response = await axios.get(`/profiles/${user.id}`);
        setProfile({
          name:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.name
              : '',
          phone: response.data.user.phone,
          lineId:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.lineId
              : '',
          facebookId:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.facebookId
              : '',
          location:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.location
              : '',
          etc:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.etc
              : '',
          imageProfile:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.imageProfile
              : '',
          qrCodeLine:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.qrCodeImage
              : '',
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromProfile();
  }, []);
  console.log(profile);

  return (
    <section className='profile_seller_area'>
      <div className='profile_style'>
        <label for='' className='label_profile'>
          โปรไฟล์ผู้ขาย
        </label>
      </div>
      <div className='first'>
        <div className='first_one'>
          <img src='./img/Human icon.png' alt='' />
        </div>
        <div className='first_two'>
          <img src='./img/MyQR.JPG' alt='' />
        </div>
        <div className='first_three'>
          <div className='data seller_name'>
            <span>ชื่อ: </span>
            <span>{profile.name}</span>
          </div>
          <div className='data seller_phone'>
            <span>เบอร์โทร: </span>
            <span>{profile.phone}</span>
          </div>
          <div className='data seller_id_line'>
            <span>ID LINE: </span>
            <span>{profile.lineId}</span>
          </div>
          <div className='data seller_facebook'>
            <span>Facebook: </span>
            <span>{profile.facebookId}</span>
          </div>
          <div className='data seller_access'>
            <span>สถานที่: </span>
            <span>{profile.location}</span>
          </div>
          <div className='data seller_etc'>
            <span>ข้อมูลอื่นๆ: </span>
            <span>{profile.etc}</span>
          </div>
          <div className='a_style_nav_edit'>
            <Link to='/profile-editor' className='nav_to_profile_editer'>
              แก้ไขโปรไฟล์
            </Link>
          </div>
        </div>
      </div>
      <div className='second'>
        <div className='second_one'>
          <form action='' className='add_form'>
            <div className='half_top_input'>
              <div className='div1 lottery_number_input'>
                <label for='input_lottery_number'>เลขหวย</label>
                <input
                  type='text'
                  id='input_lottery_number'
                  placeholder='ใส่เลขหวย'
                  maxlength='6'
                />
              </div>
              <div className='div1 lottery_value'>
                <label for='input_lottery_value'>จำนวน</label>
                <input
                  type='text'
                  id='input_lottery_value'
                  placeholder='ใส่จำนวนหวย'
                />
              </div>
            </div>
            <div className='midle_input'>
              <label
                for='input_lottery_access'
                className='label_lottery_access'>
                สถานที่ขาย
              </label>
              <br />
              <input
                type='text'
                id='input_lottery_access'
                placeholder='ใส่สถานที่ขาย'
              />
            </div>
            <div className='half_bottom_input'>
              <button type='submit'>เพิ่ม</button>
              <button type='submit'>ยกเลิก</button>
              <button type='submit'>ลบหวยทั้งหมด</button>
            </div>
          </form>
        </div>
      </div>
      <div className='third'>
        <div className='thirdFlex'>
          <Lottery_ticket_Edit />
          <Lottery_ticket_Edit />
          <Lottery_ticket_Edit />
          <Lottery_ticket_Edit />
        </div>
      </div>
    </section>
  );
}

export default Seller;
