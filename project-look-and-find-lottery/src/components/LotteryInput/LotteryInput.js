import '../../style.css';
function LotteryInput() {
  return (
    <section className='profile_seller_in_lottery_page_area'>
      <div className='profile_style_lottery_page'>
        <label className='label_profile_in_lottery_page'>โปรไฟล์ผู้ขาย</label>
      </div>
      <div className='fourth'>
        <div className='fourth_one'>
          <img src='./img/Human icon.png' alt='' />
        </div>
        <div className='fourth_two'>
          <img src='./img/MyQR.JPG' alt='' />
        </div>
        <div className='fourth_three'>
          <div className='data seller_name'>ชื่อ: สรวิชญ์ ขวัญมุข</div>
          <div className='data seller_phone'>เบอร์โทร: 0877316012</div>
          <div className='data seller_id_line'>ID LINE: sorawit_kwanmuk </div>
          <div className='data seller_facebook'>Facebook: Sorawit Kwanmuk</div>
          <div className='data seller_access'>
            สถานที่: ถ. พหลโยธิน แขวง ถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400
          </div>
          <div className='data seller_etc'>ข้อมูลอื่นๆ:</div>
        </div>
      </div>
      <div className='fifth'>
        <div className='fifth_one'>
          <div className='Fifth_one'>หวยที่ค้นหา</div>
        </div>
      </div>
      <div className='profile_style_another_lottery'>
        <label className='label_output_search_another_lottery'>
          หวยใบอื่นๆที่มี
        </label>
      </div>
      <div className='sixth'>
        <div className='sixthFlex'>
          <div className='sixth_one'>1</div>
          <div className='sixth_two'>2</div>
          <div className='sixth_three'>3</div>
          <div className='sixth_four'>4</div>
        </div>
      </div>
    </section>
  );
}

export default LotteryInput;
