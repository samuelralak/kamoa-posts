import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {navigate} from '../../App';

const PostsHeaderRight = () => (
  <TouchableOpacity onPress={() => navigate('CreatePost')}>
    <Text style={styles.title}>Create post</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
});

export default PostsHeaderRight;
