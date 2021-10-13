import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { ThisLotteryDetailContext } from '../../contexts/thisLotteryDetailContext';

import LotteryTicket from '../LotteryTicket/LotteryTicket';
import { LotteryContext } from '../../contexts/lotteryContext';

function LotteryDetail() {
  const { lottery, setLottery } = useContext(LotteryContext);
  const { thisLotteryData, setThisLotteryData } = useContext(
    ThisLotteryDetailContext
  );
  const [ownerOfLottery, setOwnerOfLottery] = useState([]);
  const { id } = lottery;
  const [profile, setProfile] = useState({});
  console.log('profile: ', profile);
  console.log('ownerOfLottery: ', ownerOfLottery);

  useEffect(() => {
    const fetchDataFromProfile = async () => {
      try {
        const response = await axios.get(`/profiles/${thisLotteryData.userId}`);
        setProfile(curr => ({
          ...curr,
          name: response.data.user.UserProfile.name,
          phone: response.data.user.phone,
          lineId: response.data.user.UserProfile.lineId,
          facebookId: response.data.user.UserProfile.facebookId,
          location: response.data.user.UserProfile.location,
          etc: response.data.user.UserProfile.etc,
          imageProfile: response.data.user.UserProfile.imageProfile,
          qrCodeLine: response.data.user.UserProfile.qrCodeImage,
          dateInput: response.data.user.UserProfile.dateInput,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataFromProfile();
  }, []);
  useEffect(() => {
    // console.log('1xxxxxxxxxx');
    axios
      .get(`/lotteries/${thisLotteryData.userId}`)
      .then(res => {
        // console.log('result: ', res);
        const resultArray = res.data.lottery.map(lottery => {
          return {
            id: lottery.id,
            lotteryNumber: lottery.lotteryNumber,
            lotteryQuantity: lottery.lotteryQuantity,
            lotteryLocation: lottery.lotteryLocation,
            dateInput: lottery.dateInput,
          };
        });
        console.log('resultArray: ', resultArray);
        // setOwnerOfLottery(cur => [...cur, resultArray]);
        setOwnerOfLottery(resultArray);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log('ownerOfLottery: ', ownerOfLottery);

  console.log('thisLotteryData: ', thisLotteryData);
  return (
    <section className='profile_seller_in_lottery_page_area'>
      <div className='profile_style_lottery_page'>
        <label htmlFor='' className='label_profile_in_lottery_page'>
          โปรไฟล์ผู้ขาย
        </label>
      </div>
      <div className='fourth'>
        <div className='fourth_one'>
          <img src={profile.imageProfile} alt='' />
        </div>
        <div className='fourth_two'>
          <img src='./img/MyQR.JPG' alt='' />
        </div>
        <div className='fourth_three'>
          <div className='data seller_name'>ชื่อ: {profile.name}</div>
          <div className='data seller_phone'>เบอร์โทร: {profile.phone}</div>
          <div className='data seller_id_line'>ID LINE: {profile.lineId} </div>
          <div className='data seller_facebook'>
            Facebook: {profile.facebookId}
          </div>
          <div className='data seller_access'>สถานที่: {profile.location}</div>
          <div className='data seller_etc'>ข้อมูลอื่นๆ: {profile.etc}</div>
        </div>
      </div>
      <div className='fifth'>
        <div className='fifth_one'>
          <LotteryTicket item={thisLotteryData} />
        </div>
      </div>
      <div className='profile_style_another_lottery'>
        <label htmlFor='' className='label_output_search_another_lottery'>
          หวยใบอื่นๆที่มี
        </label>
      </div>
      <div className='sixth'>
        <div className='sixthFlex'>
          {ownerOfLottery.map(item => (
            <LotteryTicket key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LotteryDetail;
