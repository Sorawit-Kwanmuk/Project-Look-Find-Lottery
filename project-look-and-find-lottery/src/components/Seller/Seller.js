import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import '../../style.css';
import Lottery_ticket_Edit from '../LotteryTicket/Lottery_ticket_Edit';
import { Link } from 'react-router-dom';
import { setToken } from '../../services/localStorage';
import { LotteryContext } from '../../contexts/lotteryContext';
import avatar from '../../images/avatar.png';
import qrCode from '../../images/qrCode.png';

function Seller() {
  const { user } = useContext(AuthContext);
  const { lottery, setLottery, statusCon, setStatusCon } =
    useContext(LotteryContext);
  // console.log(lottery);
  const [error, setError] = useState({});
  const [trueFalse, setTrueFalse] = useState(false);

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
        console.log('9999999999999999999999999999999999999999999999999999');
        const response = await axios.get(`/profiles/${user.id}`);
        console.log('userId: ', user.id);
        console.log('777777777777777777777777777777777777777777777777');
        console.log(response.data);
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
              : avatar,
          qrCodeLine:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.qrCodeLine
              : qrCode,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromProfile();
  }, [trueFalse]);

  // console.log(profile);
  const handleClickDeleteTicket = async id => {
    try {
      await axios.delete(`/lotteries/${id}`);
      const newArr = [...lottery];
      const targetIndex = newArr.findIndex(item => item.id === id);
      if (targetIndex !== -1) {
        newArr.splice(targetIndex, 1);
        // console.log('newArr', newArr);
        setLottery(newArr);
      }
    } catch (error) {
      console.dir(error);
    }
  };
  const handleSaveLottery = async e => {
    try {
      // console.log(status);
      e.preventDefault();
      let isError = false;
      // console.log(profile);
      if (isNaN(profile.lotteryNumber)) {
        setError(cur => {
          return { ...cur, lotteryNumber: 'กรุณากรอกตัวเลขเท่านั้น' };
        });
        isError = true;
      }
      if (profile.lotteryNumber.length !== 6) {
        setError(cur => {
          return { ...cur, lotteryNumber: 'กรุณากรอกตัวเลข 6 หลัก' };
        });
        isError = true;
      }
      if (profile.lotteryNumber === '') {
        setError(cur => {
          return { ...cur, lotteryNumber: 'กรุณากรอกตัวเลข' };
        });
        isError = true;
      }
      if (profile.lotteryQuantity === '') {
        setError(cur => {
          return { ...cur, lotteryQuantity: 'กรุณากรอกจำนวนหวย' };
        });
        isError = true;
      }
      if (isNaN(profile.lotteryQuantity)) {
        setError(cur => {
          return { ...cur, lotteryQuantity: 'จำนวนหวยต้องเป็นตัวเลข' };
        });
        isError = true;
      }
      if (profile.lotteryLocation === '') {
        setError(cur => {
          return { ...cur, lotteryLocation: 'กรุณากรอกสถานที่ขายหวย' };
        });
      }
      // if (
      //   profile.dateInput.slice(8, 10) !== 1 ||
      //   profile.dateInput.slice(8, 10) !== 16
      // ) {
      //   setError(cur => {
      //     return { ...cur, dateInput: 'กรุณากรอกงวดหวยให้ถูกต้อง' };
      //   });
      // }
      if (!isError) {
        const response = await axios.post(`/lotteries/${user.id}`, {
          lotteryNumber: profile.lotteryNumber,
          lotteryQuantity: profile.lotteryQuantity,
          lotteryLocation: profile.lotteryLocation,
          dateInput: profile.dateInput,
        });
        const newArr = [...lottery];
        // console.log(newArr);
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
        setTrueFalse(cur => !cur);
        console.log('gggggggggggggggggggggggg');
        setStatusCon(cur => !cur);
        // console.log(trueFalse);
        setError({});
      }
    } catch (error) {
      console.dir(error);
    }
  };
  // console.log(new Date().toISOString().slice(8, 10));

  const handleClickCancel = () => {
    setProfile(curr => ({
      ...curr,
      lotteryNumber: '',
      lotteryQuantity: '',
    }));
  };
  const handeDeleteAllLottery = async () => {
    try {
      // console.log(user.id);
      const result = window.confirm('คุณต้องการลบหวยทั้งหมดใช่หรือไม่');
      if (result) {
        await axios.delete(`/lotteries/delete-all/${user.id}`);
        setLottery([]);
      }
    } catch (error) {
      console.dir(error);
    }
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
          <img src={profile.imageProfile} alt='' />
        </div>
        <div className='first_two'>
          <img src={profile.qrCodeLine} alt='' />
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
                {error.lotteryNumber && (
                  <p className='errorSeller'>{error.lotteryNumber}</p>
                )}
              </div>
              <div className='div1 lottery_value'>
                <label htmlFor='input_lottery_value'>จำนวน</label>
                <input
                  type='text'
                  id='input_lottery_value'
                  placeholder='ใส่จำนวนหวย'
                  value={profile.lotteryQuantity}
                  maxLength='3'
                  onChange={e =>
                    setProfile({
                      ...profile,
                      lotteryQuantity: e.target.value,
                    })
                  }
                />
                {error.lotteryQuantity && (
                  <p className='errorSeller'>{error.lotteryQuantity}</p>
                )}
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
                {error.lotteryLocation && (
                  <p className='errorSeller'>{error.lotteryLocation}</p>
                )}
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
                {error.dateInput && (
                  <p className='errorSeller'>{error.dateInput}</p>
                )}
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
              <button
                type='button'
                className='button_delete_all'
                onClick={handeDeleteAllLottery}>
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
              setStatusCon={setStatusCon}
              handleClickDeleteTicket={() => handleClickDeleteTicket(item.id)}
              setTrueFalse={setTrueFalse}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Seller;
