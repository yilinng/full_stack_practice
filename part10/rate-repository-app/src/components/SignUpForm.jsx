import { View, Pressable, StyleSheet, Text } from 'react-native'
import FormikTextInput from './FormikTextInput'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    maxHeight: 420,
  },
  container1: {
    backgroundColor: 'white',
    margin: 10,
  },
  Btn: {
    backgroundColor: '#1E90FF',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
  },
  formInput: {
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
  },
  defaultErrorText: {
    opacity: 0,
  },
})

const SignInForm = ({ onSubmit, error, errMsg }) => {
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
        <FormikTextInput
          name='passwordConfirm'
          placeholder='Password confirm'
          secureTextEntry={true}
        />
        {error || errMsg ? (
          <View>
            <Text style={styles.errorText}>{error || errMsg}</Text>
          </View>
        ) : (
          <View style={styles.defaultErrorText}>
            <Text>Invalid username or password</Text>
          </View>
        )}

        <Pressable onPress={onSubmit}>
          <Text style={styles.Btn}>sign up</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignInForm
