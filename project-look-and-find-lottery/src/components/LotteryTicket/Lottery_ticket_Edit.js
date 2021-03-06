import { useContext, useState } from 'react';
import axios from '../../config/axios';
import { LotteryContext } from '../../contexts/lotteryContext';
import './style_lottery.css';
function Lottery_ticket_Edit({ item, handleClickDeleteTicket, setTrueFalse }) {
  const {
    id,
    lotteryNumber,
    lotteryQuantity,
    lotteryLocation,
    dateInput,
    userId,
  } = item;
  const [status, setStatus] = useState(false);
  const [editLotteryData, setEditLotteryData] = useState({
    ticketId: id,
    lotteryNumber,
    lotteryQuantity,
    lotteryLocation,
    dateInput,
  });
  setTrueFalse(status);
  const { lottery, setLottery, setStatusCon } = useContext(LotteryContext);
  const handleEditTicket = async () => {
    try {
      setStatus(cur => !cur);
      setTrueFalse(cur => !cur);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('id1: ', id);
  const handleSaveEdited = async () => {
    try {
      // console.log('id: ', id);
      // console.log('lottery1452: ', lottery);
      // console.log('editLotteryData: ', editLotteryData);
      const res = await axios.put(`/lotteries/${id}`, editLotteryData);
      // console.log(res);
      const newLottery = [...lottery];
      const index = newLottery.findIndex(lottery => lottery.id === id);
      // console.log('index: ', index);
      if (index !== -1) {
        newLottery[index] = editLotteryData;
        // console.log('newLottery: ', newLottery);
        setLottery(newLottery);
      }
      setStatusCon(cur => !cur);
      setStatus(cur => !cur);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log('editLotteryData', editLotteryData);

  return (
    <>
      {status === true ? (
        <div className='lottery_body_edit'>
          <div className='div_ticket_top_edit'>
            <div className='lottery_number'>
              <input
                type='text'
                className='edit_input'
                value={editLotteryData.lotteryNumber}
                maxLength='6'
                minLength='6'
                onChange={e =>
                  setEditLotteryData(curr => ({
                    ...curr,
                    lotteryNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className='div_amount_lottry'>
              <label htmlFor='' className='amount_lottry_label1'>
                ???????????????
              </label>
              <input
                type='text'
                className='amount_lottery'
                value={editLotteryData.lotteryQuantity}
                onChange={e =>
                  setEditLotteryData(curr => ({
                    ...curr,
                    lotteryQuantity: e.target.value,
                  }))
                }
              />
              <label htmlFor='' className='amount_lottry_label2'>
                ??????
              </label>
            </div>
          </div>
          <div className='div_ticket_bottom_edit'>
            <div className='div_ticket_access'>
              <div className='label_style'>
                <label htmlFor=''>??????????????????????????????</label>
              </div>

              <input
                type='text'
                className='input_access_area'
                value={editLotteryData.lotteryLocation}
                onChange={e =>
                  setEditLotteryData(curr => ({
                    ...curr,
                    lotteryLocation: e.target.value,
                  }))
                }
              />
            </div>
            <div className='div_ticket_date'>
              <div className='label_style'>
                <label htmlFor=''>???????????????????????????????????????????????????</label>
              </div>
              <input
                type='date'
                className='input_date_area'
                value={editLotteryData.dateInput}
                onChange={e =>
                  setEditLotteryData(curr => ({
                    ...curr,
                    dateInput: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className='div_button'>
            <button
              className='button_ticket edit_ticket'
              onClick={handleSaveEdited}>
              ??????????????????
            </button>
            <button
              className='button_ticket delete_ticket'
              onClick={handleClickDeleteTicket}>
              ??????
            </button>
          </div>
        </div>
      ) : (
        <div className='lottery_body_edit'>
          <div className='div_ticket_top_edit'>
            <div className='lottery_number'>
              <p>
                {lotteryNumber.toString().replace(/\B(?=(\d{1})+(?!\d))/g, ` `)}
              </p>
            </div>
            <div className='div_amount_lottry'>
              <label htmlFor='' className='amount_lottry_label1'>
                ???????????????
              </label>
              <div className='amount_lottery'>{lotteryQuantity}</div>
              <label htmlFor='' className='amount_lottry_label2'>
                ??????
              </label>
            </div>
          </div>
          <div className='div_ticket_bottom_edit'>
            <div className='div_ticket_access'>
              <div className='label_style'>
                <label htmlFor=''>??????????????????????????????</label>
              </div>
              <div className='access_area'>{lotteryLocation}</div>
            </div>
            <div className='div_ticket_date'>
              <div className='label_style'>
                <label htmlFor=''>??????????????????</label>
              </div>
              <div className='date_area'>
                <p>{dateInput.slice(0, 10)}</p>
              </div>
            </div>
          </div>
          <div className='div_button'>
            <button
              className='button_ticket edit_ticket'
              onClick={handleEditTicket}>
              ???????????????
            </button>
            <button
              className='button_ticket delete_ticket'
              onClick={handleClickDeleteTicket}>
              ??????
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Lottery_ticket_Edit;
