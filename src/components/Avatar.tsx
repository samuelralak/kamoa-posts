import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Avatar = ({name}: {name: string}) => {
  return (
    <View style={styles.userAvatarContainer}>
      <Text style={styles.userAvatar}>{name?.slice(0, 2).toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userAvatarContainer: {
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    borderColor: '#4b5563',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  userAvatar: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Avatar;
