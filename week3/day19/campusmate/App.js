import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store/store';
import { offlineService } from './src/services/offlineService';
import { networkService } from './src/services/networkService';

export default function App() {
  useEffect(() => {
    const stopNetworkMonitoring =
      networkService.startMonitoring();

    const loadOfflineData = async () => {
      const cachedDashboard =
        await offlineService.getDashboard();

      if (cachedDashboard) {
        console.log('Restored CampusMate offline data');
      }
    };

    loadOfflineData();

    return () => {
      stopNetworkMonitoring();
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}