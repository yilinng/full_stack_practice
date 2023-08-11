import { View, Pressable, StyleSheet, Text } from 'react-native'
import FormikTextInput from './FormikTextInput'
import FormikTextAreaInput from './FormikTextAreaInput'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    maxHeight: 700,
  },
  container1: {
    backgroundColor: 'white',
    margin: 10,
  },
  formInput: {
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
  },
  defaultErrorText: {
    opacity: 0,
  },
  BtnDiv: {
    height: 50,
    backgroundColor: 'white',
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

const CreateReviewForm = ({ onSubmit, error }) => {
  //https://snack.expo.dev/@kalleilv/formik-example
  //https://stackoverflow.com/questions/29337444/how-do-you-style-a-textinput-in-react-native-for-password-input
  //https://stackoverflow.com/questions/41678570/what-is-an-alternative-of-textarea-in-react-native
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <FormikTextInput
          name='ownerName'
          placeholder='Repository owner name'
          style={styles.formInput}
        />
        <FormikTextInput name='repositoryName' placeholder='Repository name' />
        <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />

        <FormikTextAreaInput
          name='text'
          placeholder='review text maximum 2000 characters'
        />
        {error ? (
          <View>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.defaultErrorText}>
              Invalid ownerName or repositoryName or rating
            </Text>
          </View>
        )}

        <Pressable onPress={onSubmit}>
          <View style={styles.BtnDiv}>
            <Text style={styles.Btn}>Create a review</Text>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default CreateReviewForm
