import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AppView from '../components/AppView';
import {useFetchPostsQuery} from '../api';
import {Post} from '../types';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../../App';

const PostListScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const {data, isLoading} = useFetchPostsQuery();

  const showDetails = (postId: number) => {
    navigation.navigate('PostDetails', {postId});
  };

  return (
    <AppView isLoading={isLoading}>
      <FlatList
        data={data}
        renderItem={({item}: {item: Post}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => showDetails(item.id)}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.body} numberOfLines={2}>
              {item?.body}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={post => post.id.toString()}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderColor: '#d1d5db',
  },
  title: {
    fontSize: 18,
    color: '#111827',
    textTransform: 'capitalize',
  },
  body: {
    fontSize: 18,
  },
});

export default PostListScreen;
