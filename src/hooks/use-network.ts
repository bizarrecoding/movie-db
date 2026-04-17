import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export const useNetwork = () => {
  const [networkAvailable, setNetworkAvailable] = useState(true)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type)
      console.log('Is connected?', state.isConnected)
      setNetworkAvailable(!!state.isConnected)
    });
    return () => unsubscribe()
  }, [])
  return networkAvailable;
}
