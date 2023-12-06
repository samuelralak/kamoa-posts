import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostListScreen from './src/screens/PostListScreen';
import {Provider} from 'react-redux';
import store from './src/store';
import PostDetailScreen from './src/screens/PostDetailScreen';
import CommentsModal from './src/modals/CommentsModal';
import CreatePostModal from './src/modals/CreatePostModal';
import PostsHeaderRight from './src/components/PostsHeaderRight';

export type RootStackParamList = {
  Posts: undefined;
  PostDetails: {postId: number | undefined};
  Comments: {postId: number | undefined};
  CreatePost: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef();
export const navigate = (name: string, params = {}) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={'Posts'}>
          <Stack.Screen
            name="Posts"
            component={PostListScreen}
            options={{headerRight: PostsHeaderRight}}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetailScreen}
            initialParams={{postId: undefined}}
          />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="Comments"
              component={CommentsModal}
              initialParams={{postId: undefined}}
            />
            <Stack.Screen name="CreatePost" component={CreatePostModal} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
