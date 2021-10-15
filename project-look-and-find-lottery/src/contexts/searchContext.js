import { createContext, useState } from 'react';

const SearchContext = createContext();
function SearchContextProvider({ children }) {
  const [filterSearchByNumber, setFilterSearchByNum] = useState('');
  const [filterSearchBySelect, setFilterSearchBySelect] = useState('');
  const [statusFix, setStatusFix] = useState(false);
  return (
    <SearchContext.Provider
      value={{
        filterSearchByNumber,
        setFilterSearchByNum,
        filterSearchBySelect,
        setFilterSearchBySelect,
        statusFix,
        setStatusFix,
      }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchContextProvider };
