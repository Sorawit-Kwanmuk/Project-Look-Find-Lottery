import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { LotteryContext } from '../../contexts/lotteryContext';
import { SearchContext } from '../../contexts/searchContext';
import '../../style.css';
import OutputSearch from './Home_components/OutputSearch';
import SearchBar from './Home_components/SearchBar';
import { ThisLotteryDetailContext } from '../../contexts/thisLotteryDetailContext';

function Home() {
  const {
    filterSearchByNumber,
    filterSearchBySelect,
    statusFix,
    setStatusFix,
  } = useContext(SearchContext);
  const { setStorageLotteryFilter } = useContext(ThisLotteryDetailContext);
  // const [allLottery, setAllLottery] = useState([]);
  const [filterSearch, setFilterSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState('');

  // console.log('allLottery :', allLottery);
  useEffect(() => {
    // console.log('1');

    const fetchAllLotteryFromTable = async () => {
      try {
        const response = await axios.get(`/lotteries/all`);
        // console.log(response.data);
        // console.log('res: ', response.data);
        setFilterSearch(filterLottery(response.data.lottery));
        // console.log(response.data.lottery);
        // console.log('xxxx');
        // setStorageLotteryFilter(filterLottery(response.data.lottery));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllLotteryFromTable();
  }, [isSearch, statusFix]);
  // console.log(allLottery);
  // useEffect(() => {
  //   setFilterSearch(curr => filterLottery(curr));
  // }, [isSearch]);
  // console.log('filterSearchBySelect: ', filterSearchBySelect);
  // console.log(isSearch);

  function filterLottery(array) {
    if (isNaN(filterSearchByNumber)) {
      return setError('กรุณาค้นหาเป็นตัวเลข');
    }
    if (filterSearchByNumber === '' || !isNaN(filterSearchByNumber)) {
      setError('');
    }
    // console.log('filterSearchByNumber: ', filterSearchByNumber);
    // console.log('array; ', array);

    return array.filter(lottery => {
      if (filterSearchByNumber === '') {
        return lottery.lotteryNumber;
      } else if (filterSearchBySelect === '') {
        return lottery.lotteryNumber.includes(filterSearchByNumber);
      } else if (filterSearchBySelect === 'fullNumber') {
        return lottery.lotteryNumber.slice(0, 6) === filterSearchByNumber;
      } else if (filterSearchBySelect === 'threeFront') {
        return lottery.lotteryNumber.slice(0, 3) === filterSearchByNumber;
      } else if (filterSearchBySelect === 'threeBack') {
        return lottery.lotteryNumber.slice(3, 6) === filterSearchByNumber;
      } else if (filterSearchBySelect === 'twoBack') {
        return lottery.lotteryNumber.slice(4, 6) === filterSearchByNumber;
      }
    });
  }
  const onSubmitSearch = e => {
    e.preventDefault();

    setIsSearch(curr => !curr);
  };

  useEffect(() => {}, []);
  // console.log('filterSearch :', filterSearch);
  return (
    <>
      <SearchBar onSubmitSearch={onSubmitSearch} error={error} />
      {!error && <OutputSearch filterSearch={filterSearch} />}
    </>
  );
}

export default Home;
