import { createContext, useState } from 'react';

const ThisLotteryDetailContext = createContext();
function ThisLotteryDetailContextProvider({ children }) {
  const [thisLotteryData, setThisLotteryData] = useState(null);
  return (
    <ThisLotteryDetailContext.Provider
      value={{ thisLotteryData, setThisLotteryData }}>
      {children}
    </ThisLotteryDetailContext.Provider>
  );
}

export { ThisLotteryDetailContext, ThisLotteryDetailContextProvider };
