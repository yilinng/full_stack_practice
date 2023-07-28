import { TextInput as NativeTextInput, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  input: {
    boxSizing: 'border-box',
    border: '2px solid #ccc',
    fontSize: 20,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  inputError: {
    boxSizing: 'border-box',
    border: '2px solid #d73a4a',
    fontSize: 20,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 10,
  },
})
//https://stackoverflow.com/questions/44739331/change-react-native-textinputs-placeholder-color
const TextInput = ({ style, error, ...props }) => {
  // const textInputStyle = [style]
  console.log('error', error)
  return (
    <NativeTextInput
      style={error ? styles.inputError : styles.input}
      {...props}
      placeholderTextColor='#A9A9A9'
    />
  )
}

export default TextInput
