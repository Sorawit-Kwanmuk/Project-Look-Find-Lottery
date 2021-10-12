import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import '../../style.css';
import Lottery_ticket_Edit from '../LotteryTicket/Lottery_ticket_Edit';
import { Link } from 'react-router-dom';
import { setToken } from '../../services/localStorage';
import { LotteryContext } from '../../contexts/lotteryContext';

function Seller() {
  const { user } = useContext(AuthContext);
  const { lottery, setLottery } = useContext(LotteryContext);
  // console.log(lottery);
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
    lotteryNumber: '',
    lotteryQuantity: '',
    lotteryLocation: '',
    dateInput: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    const fetchDataFromProfile = async () => {
      try {
        const response = await axios.get(`/profiles/${user.id}`);
        setProfile(curr => ({
          ...curr,
          name:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.name
              : '',
          phone: response.data.user.phone,
          lotteryLocation:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.location
              : '',
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
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromProfile();
  }, []);
  // console.log(profile);
  const handleClickDeleteTicket = async id => {
    try {
      await axios.delete(`/lotteries/${id}`);
      const newArr = [...lottery];
      const targetIndex = newArr.findIndex(item => item.id === id);
      if (targetIndex !== -1) {
        newArr.splice(targetIndex, 1);
        console.log('newArr', newArr);
        setLottery(newArr);
      }
    } catch (error) {
      console.dir(error);
    }
  };
  const handleSaveLottery = async e => {
    try {
      e.preventDefault();
      // console.log(profile);
      const response = await axios.post(`/lotteries/${user.id}`, {
        lotteryNumber: profile.lotteryNumber,
        lotteryQuantity: profile.lotteryQuantity,
        lotteryLocation: profile.lotteryLocation,
        dateInput: profile.dateInput,
      });
      const newArr = [...lottery];
      console.log(newArr);
      newArr.push({
        lotteryNumber: profile.lotteryNumber,
        lotteryQuantity: profile.lotteryQuantity,
        lotteryLocation: profile.lotteryLocation,
        dateInput: profile.dateInput,
      });
      setLottery(newArr);
      setProfile(curr => ({
        ...curr,
        lotteryNumber: '',
        lotteryQuantity: '',
      }));
      // setToken(response.data.token);

      // console.log(response);
    } catch (error) {
      console.dir(error);
    }
  };

  const handleClickCancel = () => {
    setProfile({
      lotteryNumber: '',
      lotteryQuantity: '',
    });
  };

  return (
    <section className='profile_seller_area'>
      <div className='profile_style'>
        <label htmlFor='' className='label_profile'>
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
          <form action='' className='add_form' onSubmit={handleSaveLottery}>
            <div className='half_top_input'>
              <div className='div1 lottery_number_input'>
                <label htmlFor='input_lottery_number'>เลขหวย</label>
                <input
                  type='text'
                  id='input_lottery_number'
                  placeholder='ใส่เลขหวย'
                  maxlength='6'
                  value={profile.lotteryNumber}
                  onChange={e =>
                    setProfile({ ...profile, lotteryNumber: e.target.value })
                  }
                />
              </div>
              <div className='div1 lottery_value'>
                <label htmlFor='input_lottery_value'>จำนวน</label>
                <input
                  type='text'
                  id='input_lottery_value'
                  placeholder='ใส่จำนวนหวย'
                  value={profile.lotteryQuantity}
                  onChange={e =>
                    setProfile({
                      ...profile,
                      lotteryQuantity: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className='wrap_middle'>
              <div className='middle_input'>
                <label
                  htmlFor='input_lottery_access'
                  className='label_lottery_access'>
                  สถานที่ขาย
                </label>
                <br />
                <input
                  type='text'
                  id='input_lottery_access'
                  placeholder='ใส่สถานที่ขาย'
                  value={profile.lotteryLocation}
                  onChange={e =>
                    setProfile({ ...profile, lotteryLocation: e.target.value })
                  }
                />
              </div>
              <div className='middle_input2'>
                <label
                  htmlFor='input_lottery_date'
                  className='label_lottery_date'>
                  งวดหวย
                </label>
                <br />
                <input
                  type='date'
                  id='input_lottery_date'
                  value={profile.dateInput.slice(0, 10)}
                  onChange={e =>
                    setProfile({
                      ...profile,
                      dateInput: e.target.value.slice(0, 10),
                    })
                  }
                />
              </div>
            </div>

            <div className='half_bottom_input'>
              <button type='submit'>เพิ่ม</button>
              <button
                type='button'
                className='button_cancel'
                onClick={handleClickCancel}>
                ยกเลิก
              </button>
              <button type='button' className='button_delete_all'>
                ลบหวยทั้งหมด
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='third'>
        <div className='thirdFlex'>
          {lottery.map(item => (
            <Lottery_ticket_Edit
              key={item.id}
              item={item}
              handleClickDeleteTicket={() => handleClickDeleteTicket(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Seller;
