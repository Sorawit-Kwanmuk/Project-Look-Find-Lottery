import '../../../style.css';
function SearchBar() {
  return (
    <section className='search_area'>
      <form action='' className='search_form'>
        <input type='text' className='search_box' />
        <select name='search_option' id='search_option'>
          <option value='full_number'>เลข 6 ตัว</option>
          <option value='front_three_number'>เลขหน้า 3 ตัว</option>
          <option value='end_three_number'>เลขท้าย 3 ตัว</option>
          <option value='end_two_number'>เลขท้าย 2 ตัว</option>
        </select>
        <button type='submit'>ค้นหา</button>
      </form>
    </section>
  );
}

export default SearchBar;
