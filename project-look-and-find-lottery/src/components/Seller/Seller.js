import '../../style.css';
import Lottery_ticket_Edit from '../LotteryTicket/Lottery_ticket_Edit';

function Seller() {
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
          <div className='data seller_name'>ชื่อ: สรวิชญ์ ขวัญมุข</div>
          <div className='data seller_phone'>เบอร์โทร: 0877316012</div>
          <div className='data seller_id_line'>ID LINE: sorawit_kwanmuk </div>
          <div className='data seller_facebook'>Facebook: Sorawit Kwanmuk</div>
          <div className='data seller_access'>
            สถานที่: ถ. พหลโยธิน แขวง ถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400
          </div>
          <div className='data seller_etc'>ข้อมูลอื่นๆ:</div>
          <div className='a_style_nav_edit'>
            <a
              href='./Profile_editor_page.html'
              className='nav_to_profile_editer'>
              แก้ไขโปรไฟล์
            </a>
          </div>
        </div>
      </div>
      <div className='second'>
        <div className='second_one'>
          <form action='' className='add_form'>
            <div className='half_top_input'>
              <div className='div1 lottery_number'>
                <label for='input_lottery_number'>เลขหวย</label>
                <input
                  type='text'
                  id='input_lottery_number'
                  placeholder='ใส่เลขหวย'
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
