import { TextInput as NativeTextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 2,
    fontSize: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  inputError: {
    borderColor: '#d73a4a',
    borderWidth: 2,
    fontSize: 20,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
  },
})
//https://stackoverflow.com/questions/44739331/change-react-native-textinputs-placeholder-color
const TextAreaInput = ({ error, ...props }) => {
  // const textInputStyle = [style]
  //console.log('error', error)
  return (
    <NativeTextInput
      multiline={true}
      rows={10}
      style={error ? styles.inputError : styles.input}
      {...props}
      placeholderTextColor='#A9A9A9'
    />
  )
}

export default TextAreaInput
