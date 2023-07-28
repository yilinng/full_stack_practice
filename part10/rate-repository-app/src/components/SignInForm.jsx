import { View, Pressable, StyleSheet, Button } from 'react-native'
import FormikTextInput from './FormikTextInput'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 300,
  },
  container1: {
    backgroundColor: 'white',
    margin: 10,
  },
  button: {
    color: 'white',
    margin: 10,
  },
  formInput: {
    backgroundColor: 'white',
  },
})

const SignInForm = ({ onSubmit }) => {
  //https://snack.expo.dev/@kalleilv/formik-example
  //https://stackoverflow.com/questions/29337444/how-do-you-style-a-textinput-in-react-native-for-password-input
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <FormikTextInput
          name='username'
          placeholder='Username'
          style={styles.formInput}
        />
        <FormikTextInput
          name='password'
          placeholder='Password'
          secureTextEntry={true}
        />
        <Pressable>
          <Button style={styles.button} title='sign In' onPress={onSubmit} />
        </Pressable>
      </View>
    </View>
  )
}

export default SignInForm
