import {
  Appearance,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {navigate} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {toggleColorScheme} from '../store/color-scheme-reducer';
import setColorScheme = Appearance.setColorScheme;

const PostsHeaderRight = () => {
  const dispatch = useDispatch();
  const {colorScheme} = useSelector((state: RootState) => state.colorScheme);

  const onToggleColorScheme = () => {
    dispatch(toggleColorScheme());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate('CreatePost')}>
        <Text style={styles.title}>Create post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onToggleColorScheme}>
        <Text style={styles.title}>{colorScheme?.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    paddingHorizontal: 3,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostsHeaderRight;
