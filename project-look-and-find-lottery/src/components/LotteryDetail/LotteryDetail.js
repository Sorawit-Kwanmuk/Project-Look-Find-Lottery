import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';

import LotteryTicket from '../LotteryTicket/LotteryTicket';
import { LotteryContext } from '../../contexts/lotteryContext';
import { useLocation, useParams } from 'react-router-dom';

function LotteryDetail() {
  const [backupLotteryData, setBackupLotteryData] = useState({
    dateInput: '',
    id: '',
    lotteryLocation: '',
    lotteryNumber: '',
    lotteryQuantity: '',
    userId: '',
  });
  const [ownerOfLottery, setOwnerOfLottery] = useState([]);

  const [profile, setProfile] = useState({});

  const params = useParams();

  console.log('backupLotteryData: ', backupLotteryData);
  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const res1 = await axios.get(`/lotteries/lottery/${params.id}`);
      setBackupLotteryData(res1.data.lottery);
      const res2 = await axios.get(`/profiles/${res1.data.lottery.userId}`);
      setProfile(curr => ({
        ...curr,
        name: res2.data.user.UserProfile.name,
        phone: res2.data.user.phone,
        lineId: res2.data.user.UserProfile.lineId,
        facebookId: res2.data.user.UserProfile.facebookId,
        location: res2.data.user.UserProfile.location,
        etc: res2.data.user.UserProfile.etc,
        imageProfile: res2.data.user.UserProfile.imageProfile,
        qrCodeLine: res2.data.user.UserProfile.qrCodeLine,
        dateInput: res2.data.user.UserProfile.dateInput,
      }));
      const res3 = await axios.get(`/lotteries/${res1.data.lottery.userId}`);
      const resultArray = res3.data.lottery.map(lottery => {
        return {
          id: lottery.id,
          lotteryNumber: lottery.lotteryNumber,
          lotteryQuantity: lottery.lotteryQuantity,
          lotteryLocation: lottery.lotteryLocation,
          dateInput: lottery.dateInput,
        };
      });
      setOwnerOfLottery(resultArray);
    } catch (error) {}
    // console.log('1xxxxxxxxxx');
  }, [params.id]);
  // console.log('ownerOfLottery: ', ownerOfLottery);

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
          <img src={profile.qrCodeLine} alt='' />
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
          <LotteryTicket item={backupLotteryData} />
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
