import './style_lottery.css';
function LotteryTicket({ item }) {
  const { id, lotteryNumber, lotteryQuantity, lotteryLocation, dateInput } =
    item;
  return (
    <div className='lottery_body'>
      <div className='div_ticket_top'>
        <div className='lottery_number'>
          <p>
            {lotteryNumber.toString().replace(/\B(?=(\d{1})+(?!\d))/g, ` `)}
          </p>
        </div>
        <div className='div_amount_lottry'>
          <label htmlFor='' className='amount_lottry_label1'>
            จำนวน
          </label>
          <div className='amount_lottery'>{lotteryQuantity}</div>
          <label htmlFor='' className='amount_lottry_label2'>
            ใบ
          </label>
        </div>
      </div>
      <div className='div_ticket_bottom'>
        <div className='div_ticket_access'>
          <div className='label_style'>
            <label htmlFor=''>สถานที่</label>
          </div>
          <div className='access_area'>{lotteryLocation}</div>
        </div>
        <div className='div_ticket_date'>
          <div className='label_style'>
            <label htmlFor=''>วันที่เข้าสู่ระบบ</label>
          </div>
          <div className='date_area'>
            <p>{dateInput.slice(0, 10)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LotteryTicket;
