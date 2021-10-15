import { useHistory } from 'react-router-dom';
import '../../../style.css';
import LotteryTicket from '../../LotteryTicket/LotteryTicket';

function OutputSearch({ filterSearch }) {
  // console.log('filterSearch1: ', filterSearch);

  return (
    <section className='output_search_area'>
      <div className='output_search'>
        <div className='label_style'>
          <label className='label_seller'>ผลการค้นหา</label>
        </div>
        <div className='output_search_field'>
          {filterSearch?.map(item => (
            <LotteryTicket key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OutputSearch;
