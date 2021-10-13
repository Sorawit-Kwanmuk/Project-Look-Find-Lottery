import { createContext, useState } from 'react';

const SearchContext = createContext();
function SearchContextProvider({ children }) {
  const [filterSearchByNumber, setFilterSearchByNum] = useState('');
  const [filterSearchBySelect, setFilterSearchBySelect] = useState('');
  return (
    <SearchContext.Provider
      value={{
        filterSearchByNumber,
        setFilterSearchByNum,
        filterSearchBySelect,
        setFilterSearchBySelect,
      }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchContextProvider };
