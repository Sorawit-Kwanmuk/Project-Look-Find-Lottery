import { createContext, useState } from 'react';

const ThisLotteryDetailContext = createContext();
function ThisLotteryDetailContextProvider({ children }) {
  const [thisLotteryData, setThisLotteryData] = useState(null);
  const [storageLotteryFilter, setStorageLotteryFilter] = useState(null);
  // console.log('thisLotteryData in Context', thisLotteryData);
  return (
    <ThisLotteryDetailContext.Provider
      value={{
        thisLotteryData,
        setThisLotteryData,
        storageLotteryFilter,
        setStorageLotteryFilter,
      }}>
      {children}
    </ThisLotteryDetailContext.Provider>
  );
}

export { ThisLotteryDetailContext, ThisLotteryDetailContextProvider };
