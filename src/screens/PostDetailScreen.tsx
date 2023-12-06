import React from 'react';
import AppView from '../components/AppView';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../../App';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {useFetchPostByIdQuery} from '../api';
import CommentsBox from '../components/CommentsBox';

const PostDetailScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'PostDetails'>) => {
  const {postId} = route.params;
  const {data, isLoading} = useFetchPostByIdQuery(postId!);

  return (
    <AppView isLoading={isLoading}>
      <View style={styles.container}>
        <Text style={styles.title}>{data?.title}</Text>
        <Text style={styles.body}>{data?.body}</Text>
      </View>
      <CommentsBox postId={data?.id!} />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 24,
    color: '#111827',
    textTransform: 'capitalize',
    paddingVertical: 15,
  },
  body: {
    fontSize: 18,
  },
  commentHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 15,
    marginTop: 20,
  },
});
export default PostDetailScreen;
