import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { LotteryContext } from '../../contexts/lotteryContext';
import { SearchContext } from '../../contexts/searchContext';
import '../../style.css';
import OutputSearch from './Home_components/OutputSearch';
import SearchBar from './Home_components/SearchBar';
function Home() {
  const {
    filterSearchByNumber,
    setFilterSearchByNum,
    filterSearchBySelect,
    setFilterSearchBySelect,
  } = useContext(SearchContext);
  const { lottery, setLottery } = useContext(LotteryContext);
  // const [allLottery, setAllLottery] = useState([]);
  const [filterSearch, setFilterSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllLotteryFromTable();
  }, []);
  // console.log(allLottery);
  useEffect(() => {
    setFilterSearch(curr => filterLottery(curr));
  }, [isSearch]);

  function filterLottery(array) {
    return array.filter(lottery => {
      if (filterSearchBySelect === 'fullNumber') {
        return lottery.lotteryNumber.slice(0, 6) === filterSearchByNumber;
      } else if (filterSearchBySelect === 'threeFront') {
        return lottery.lotteryNumber.slice(0, 3) === filterSearchByNumber;
      } else if (filterSearchBySelect === 'threeBack') {
        return lottery.lotteryNumber.slice(3, 6) === filterSearchByNumber;
      } else if (filterSearchBySelect === 'twoBack') {
        return lottery.lotteryNumber.slice(4, 6) === filterSearchByNumber;
      } else {
        return true;
      }
    });
  }
  const onSubmitSearch = e => {
    e.preventDefault();

    setIsSearch(curr => !curr);
  };
  return (
    <>
      <SearchBar onSubmitSearch={onSubmitSearch} />
      <OutputSearch filterSearch={filterSearch} />
    </>
  );
}

export default Home;
