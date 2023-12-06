import React, {ReactNode} from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loader from './Loader';

const AppView = ({
  isLoading,
  children,
}: {
  isLoading?: boolean;
  children: ReactNode;
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {children}
    </View>
  );
};

export default AppView;
