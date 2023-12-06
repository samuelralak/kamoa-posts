import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import AppView from '../components/AppView';
import {useCreatePostMutation} from '../api';

export const PostSchema = z
  .object({
    title: z.coerce.string().min(10),
    body: z.coerce.string().min(50),
  })
  .required();

const CreatePostModal = () => {
  const [createPost] = useCreatePostMutation();
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: zodResolver(PostSchema)});

  const onPostSubmit: SubmitHandler<FieldValues> = async ({title, body}) => {
    const response = await createPost({title, body, userId: 1});
    if (!response.error) {
      ToastAndroid.showWithGravity(
        'Post successfully created',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  return (
    <AppView>
      <View style={styles.inputContainer}>
        <Text>Title</Text>
        <Controller
          name="title"
          control={control}
          render={({field}) => (
            <TextInput
              returnKeyType={'done'}
              style={styles.input}
              onEndEditing={({nativeEvent: {text}}) => setValue('title', text)}
              {...field}
            />
          )}
        />
        {errors.title && (
          <Text style={styles.errorMessageText}>
            {errors.title.message as ReactNode}
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Body</Text>
        <Controller
          name="body"
          control={control}
          render={({field}) => (
            <TextInput
              {...field}
              style={styles.input}
              returnKeyType={'done'}
              multiline
              numberOfLines={5}
              blurOnSubmit={true}
              textAlignVertical={'top'}
              onChange={({nativeEvent: {text}}) => setValue('body', text)}
            />
          )}
        />
        {errors.body && (
          <Text style={styles.errorMessageText}>
            {errors.body.message as ReactNode}
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onPostSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </AppView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#d1d5db',
    borderWidth: 2,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
  },
  inputContainer: {
    paddingHorizontal: 15,
    marginTop: 15,
  },
  button: {
    height: 55,
    backgroundColor: '#2563eb',
    marginHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  errorMessageText: {
    fontSize: 16,
    color: '#b91c1c',
    marginTop: 5,
  },
});

export default CreatePostModal;
