import React, {ReactNode} from 'react';
import {StatusBar, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loader from './Loader';
import {RootState} from '../store';
import {useSelector} from 'react-redux';

const AppView = ({
  isLoading,
  children,
}: {
  isLoading?: boolean;
  children: ReactNode;
}) => {
  const {darkMode} = useSelector((state: RootState) => state.colorScheme);
  const backgroundStyle = {
    backgroundColor: darkMode ? Colors.darker : Colors.lighter,
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {children}
    </View>
  );
};

export default AppView;
