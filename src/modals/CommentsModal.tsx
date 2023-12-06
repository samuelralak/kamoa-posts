import AppView from '../components/AppView';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/native-stack';
import {RootStackParamList} from '../../App';
import {useFetchPostCommentsQuery} from '../api';
import {Comment} from '../types';
import React from 'react';
import Avatar from '../components/Avatar';

const CommentsModal = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Comments'>) => {
  const {postId} = route.params;
  const {data, isLoading} = useFetchPostCommentsQuery(postId!);

  return (
    <AppView isLoading={isLoading}>
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({item}: {item: Comment}) => (
          <View style={styles.comment}>
            <Avatar name={item.name!} />
            <View style={styles.commentBody}>
              <Text style={styles.userEmail}>{item?.email}</Text>
              <Text>{item?.body}</Text>
            </View>
          </View>
        )}
        keyExtractor={comment => comment.id.toString()}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  comment: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
    fontSize: 16,
    marginHorizontal: 15,
  },
  userEmail: {
    fontWeight: 'bold',
  },
  commentBody: {
    flex: 1,
  },
});
export default CommentsModal;
