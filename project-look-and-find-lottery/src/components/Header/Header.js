import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { LotteryContext } from '../../contexts/lotteryContext';
import { SearchContext } from '../../contexts/searchContext';
import { setToken, removeToken } from '../../services/localStorage';
import '../../style.css';

function Header() {
  const { setLottery } = useContext(LotteryContext);
  const { user, setUser } = useContext(AuthContext);
  const {
    filterSearchByNumber,
    filterSearchBySelect,
    statusFix,
    setStatusFix,
  } = useContext(SearchContext);

  // const setUser = useContext(AuthContext);

  // $(function () {
  //   $('.toggle').on('click', function () {
  //     if ($('.item').hasClass('active')) {
  //       $('.item').removeClass('active');
  //     } else {
  //       $('.item').addClass('active');
  //     }
  //   });
  // });
  const toggleBurger = () => {
    const burger = document.querySelector('.toggle');
    if (user) {
      const menu1 = document.querySelector('.one');
      const menu4 = document.querySelector('.five');
      const menu5 = document.querySelector('.six');
      const menu6 = document.querySelector('.seven');
      menu1.classList.toggle('active');
      menu4.classList.toggle('active');
      menu5.classList.toggle('active');
      menu6.classList.toggle('active');
    } else if (!user) {
      const menu1 = document.querySelector('.one');
      menu1.classList.toggle('active');
      const menu2 = document.querySelector('.three');
      const menu3 = document.querySelector('.four');
      menu2.classList.toggle('active');
      menu3.classList.toggle('active');
    }

    burger.classList.toggle('active');
    //clear active after click
  };
  const handleAfterClick = () => {
    const items = document.querySelectorAll('.item');
    setStatusFix(cur => !cur);
    items.forEach(item => {
      item.classList.remove('active');
    });
  };
  const handleClickLogout = () => {
    setUser(null);
    handleAfterClick();
    //delete token
    setLottery([]);
    removeToken();
  };

  return (
    <header className='header'>
      <nav>
        <ul className='menu'>
          <li className='logo' onClick={handleAfterClick}>
            <Link to='/'>LOOK&FIND LOTTERY</Link>
          </li>

          <li className='item two one' onClick={handleAfterClick}>
            <Link to='/'>????????????????????????</Link>
          </li>

          {user && (
            <li className='item two six' onClick={handleAfterClick}>
              <Link to='/profile-editor'>?????????????????????????????????</Link>
            </li>
          )}
          {user && (
            <li className='item two seven' onClick={handleAfterClick}>
              <Link to='/seller'>??????????????????????????????</Link>
            </li>
          )}

          {user ? (
            <li
              className='item button secondary five'
              onClick={handleClickLogout}>
              <Link to='/login'>??????????????????????????????</Link>
            </li>
          ) : (
            <>
              <li
                className='item button secondary three'
                onClick={handleAfterClick}>
                <Link to='/login'>?????????????????????????????????</Link>
              </li>
              <li
                className='item button secondary four'
                onClick={handleAfterClick}>
                <Link to='/register'>?????????????????????????????????</Link>
              </li>
            </>
          )}

          <li className='toggle'>
            <span className='bars' onClick={toggleBurger}></span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
