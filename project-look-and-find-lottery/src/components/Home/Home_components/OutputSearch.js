import axios from '../../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { LotteryContext } from '../../../contexts/lotteryContext';
import '../../../style.css';
import LotteryTicket from '../../LotteryTicket/LotteryTicket';
function OutputSearch() {
  const { lottery, setLottery } = useContext(LotteryContext);
  const [allLottery, setAllLottery] = useState([]);
  console.log('allLottery :', allLottery);
  useEffect(() => {
    // console.log('1');

    const fetchAllLotteryFromTable = async () => {
      try {
        const response = await axios.get(`/lotteries/all`);
        console.log('res: ', response.data);
        setAllLottery(
          response.data.lottery
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllLotteryFromTable();
  }, []);
  return (
    <section className='output_search_area'>
      <div className='output_search'>
        <div className='label_style'>
          <label className='label_seller'>ผลการค้นหา</label>
        </div>
        <div className='output_search_field'>
          {allLottery.map(item => (
            <LotteryTicket key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OutputSearch;
