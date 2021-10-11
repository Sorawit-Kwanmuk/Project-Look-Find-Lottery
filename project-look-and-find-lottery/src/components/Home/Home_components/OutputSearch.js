import '../../../style.css';
import LotteryTicket from '../../LotteryTicket/LotteryTicket';
function OutputSearch() {
  return (
    <section className='output_search_area'>
      <div className='output_search'>
        <div className='label_style'>
          <label className='label_seller'>ผลการค้นหา</label>
        </div>
        <div className='output_search_field'>
          <LotteryTicket />
          <LotteryTicket />
          <LotteryTicket />
          <LotteryTicket />
        </div>
      </div>
    </section>
  );
}

export default OutputSearch;
