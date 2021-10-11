import './style_lottery.css';
function Lottery_ticket_Edit() {
  return (
    <>
      <div className='lottery_body_edit'>
        <div className='div_ticket_top_edit'>
          <div className='lottery_number'>
            <p>X X X X X X </p>
          </div>
          <div className='div_amount_lottry'>
            <label for='' className='amount_lottry_label1'>
              จำนวน
            </label>
            <div className='amount_lottery'>0</div>
            <label for='' className='amount_lottry_label2'>
              ใบ
            </label>
          </div>
        </div>
        <div className='div_ticket_bottom_edit'>
          <div className='div_ticket_access'>
            <div className='label_style'>
              <label for=''>สถานที่</label>
            </div>
            <div className='access_area'></div>
          </div>
          <div className='div_ticket_date'>
            <div className='label_style'>
              <label for=''>วันที่เข้าสู่ระบบ</label>
            </div>
            <div className='date_area'>
              <p>XX/XX/XXX</p>
            </div>
          </div>
        </div>
        <div className='div_button'>
          <button className='button_ticket edit_ticket'>แก้ไข</button>
          <button className='button_ticket delete_ticket'>ลบ</button>
        </div>
      </div>
    </>
  );
}

export default Lottery_ticket_Edit;
