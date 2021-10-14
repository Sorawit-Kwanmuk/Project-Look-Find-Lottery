import axios from '../config/axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './authContext';

const LotteryContext = createContext();

function LotteryContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [lottery, setLottery] = useState([]);
  const [statusCon, setStatusCon] = useState(false);
  useEffect(() => {
    // console.log('1xxxxxxxxxx');
    if (user) {
      axios
        .get(`/lotteries/${user.id}`)
        .then(res => {
          // console.log('result: ', res);
          const resultArray = res.data.lottery.map(lottery => {
            return {
              id: lottery.id,
              lotteryNumber: lottery.lotteryNumber,
              lotteryQuantity: lottery.lotteryQuantity,
              lotteryLocation: lottery.lotteryLocation,
              dateInput: lottery.dateInput,
              userId: lottery.userId,
            };
          });
          // console.log(resultArray);
          setLottery(resultArray);
        })
        .catch(err => {
          console.log(err);
        });
    }

    return () => {};
  }, [user, statusCon]);

  console.log('lottery: ', lottery);
  return (
    <LotteryContext.Provider
      value={{ lottery, setLottery, statusCon, setStatusCon }}>
      {children}
    </LotteryContext.Provider>
  );
}

export { LotteryContext, LotteryContextProvider };
