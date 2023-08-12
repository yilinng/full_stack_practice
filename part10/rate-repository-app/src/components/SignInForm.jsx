import { View, Pressable, StyleSheet, Text } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { DismissKeyboard } from './tool/DismissKeyboard'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // maxHeight: 450,
    flex: 1,
    justifyContent: 'center',
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
  errorText: {
    color: 'red',
  },
  defaultErrorText: {
    opacity: 0,
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
})

const SignInForm = ({ onSubmit, error, errMsg }) => {
  //https://snack.expo.dev/@kalleilv/formik-example
  //https://stackoverflow.com/questions/29337444/how-do-you-style-a-textinput-in-react-native-for-password-input
  //https://stackoverflow.com/questions/29685421/hide-keyboard-in-react-native
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View>
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
          </View>

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
            <View>
              <Text style={styles.Btn}>sign In</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </DismissKeyboard>
  )
}

export default SignInForm
