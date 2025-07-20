import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { useBlockNumber } from 'wagmi';

const BlockContext = createContext();


export function BlockProvider({ children, updateInterval = 1 }) {
  const [blockNumber, setBlockNumber] = useState(null);

  const [lastUpdateBlock, setLastUpdateBlock] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const { data: currentBlockNumber } = useBlockNumber({watch: true});

  useEffect(() => {
    if (currentBlockNumber) {
      const blockNum = Number(currentBlockNumber);
      setBlockNumber(blockNum);
      
      if (!lastUpdateBlock || blockNum - lastUpdateBlock >= updateInterval) {
        //console.log(`Block update triggered: ${blockNum} (last: ${lastUpdateBlock})`);
        setLastUpdateBlock(blockNum);

        setUpdateTrigger(prev => prev + 1);
      }
    }
  }, [currentBlockNumber, lastUpdateBlock, updateInterval]);

  const forceUpdate = useCallback(() => {
    console.log('Force updating block context');
    setUpdateTrigger(prev => prev + 1);
    if (blockNumber) {
      setLastUpdateBlock(blockNumber);
    }
  }, [blockNumber]);

  const shouldUpdate = blockNumber && lastUpdateBlock && 
                       blockNumber >= lastUpdateBlock + updateInterval;

  const value = {
    blockNumber,
    lastUpdateBlock,
    updateTrigger,
    shouldUpdate,
    forceUpdate,
    updateInterval
  };

  return (
    <BlockContext.Provider value={value}>
      {children}
    </BlockContext.Provider>
  );
}

export function useBlockContext() {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error('useBlockContext must be used within a BlockProvider');
  }
  return context;
}


export function useBlockUpdates(callback, dependencies = []) {
  const { updateTrigger } = useBlockContext();
  
  useEffect(() => {
    if (updateTrigger > 0) {
      callback();
    }
  }, [updateTrigger, ...dependencies]);
}
