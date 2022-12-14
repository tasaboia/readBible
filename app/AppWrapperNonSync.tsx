import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import colors from './styles/colors';
import Tabs from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import RealmContextProvider from './database/context';

export const AppWrapperNonSync = () => {
  return (
    
    <SafeAreaView style={styles.screen}>
      <NavigationContainer>
        <NativeBaseProvider>
          <RealmContextProvider>
            <Tabs />
          </RealmContextProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
});
