import {useFetchPostCommentsQuery} from '../api';
import Loader from './Loader';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Comment} from '../types';
import React from 'react';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '../../App';
import Avatar from './Avatar';

const CommentsBox = ({postId}: {postId: number}) => {
  const {data, isLoading} = useFetchPostCommentsQuery(postId);
  const firstComment = data ? data[0] : ({} as Comment);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.commentHeaderContainer}>
        <Text style={styles.commentHeader}>Comments</Text>
        <Text style={styles.commentCount}>{data?.length ?? 0}</Text>
      </View>

      {firstComment && (
        <TouchableOpacity
          onPress={() => navigate('Comments', {postId: postId})}
          style={styles.commentContainer}>
          <View style={styles.userCommentContainer}>
            <Avatar name={firstComment.name!} />
            <View style={styles.commentBodyContainer}>
              <Text numberOfLines={3}>{firstComment?.body}</Text>
            </View>
          </View>
          <Icon name={'chevron-right'} size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCommentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: 5,
    paddingVertical: 10,
  },
  commentBodyContainer: {
    flex: 1,
  },
  comment: {
    marginVertical: 10,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#d1d5db',
    borderRadius: 5,
  },
  commentHeaderContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  commentHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5,
  },
  commentCount: {
    fontSize: 16,
  },
});

export default CommentsBox;
