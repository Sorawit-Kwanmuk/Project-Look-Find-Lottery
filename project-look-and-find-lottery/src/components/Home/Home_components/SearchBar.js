import { useContext } from 'react';
import { SearchContext } from '../../../contexts/searchContext';
import '../../../style.css';
function SearchBar({ onSubmitSearch }) {
  const {
    filterSearchByNumber,
    setFilterSearchByNum,
    filterSearchBySelect,
    setFilterSearchBySelect,
  } = useContext(SearchContext);
  // const handleSubmitSearch = e => {
  //   e.preventDefault();
  // };
  return (
    <section className='search_area'>
      <form action='' className='search_form' onSubmit={onSubmitSearch}>
        <input
          type='text'
          className='search_box'
          value={filterSearchByNumber}
          onChange={e => setFilterSearchByNum(e.target.value)}
        />
        <select
          name='search_option'
          id='search_option'
          value={filterSearchBySelect}
          onChange={e => setFilterSearchBySelect(e.target.value)}>
          <option value=''>ค้นหาโดย</option>
          <option value='fullNumber'>เลข 6 ตัว</option>
          <option value='threeFront'>เลขหน้า 3 ตัว</option>
          <option value='threeBack'>เลขท้าย 3 ตัว</option>
          <option value='twoBack'>เลขท้าย 2 ตัว</option>
        </select>
        <button type='submit'>ค้นหา</button>
      </form>
    </section>
  );
}

export default SearchBar;
