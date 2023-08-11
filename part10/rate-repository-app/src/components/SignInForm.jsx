import {
  View,
  Pressable,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import FormikTextInput from './FormikTextInput'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    maxHeight: 350,
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

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormikTextInput
            name='username'
            placeholder='Username'
            style={styles.formInput}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FormikTextInput
            name='password'
            placeholder='Password'
            secureTextEntry={true}
          />
        </TouchableWithoutFeedback>

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
          <Text style={styles.Btn}>sign In</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default SignInForm
