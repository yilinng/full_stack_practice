import { StyleSheet } from 'react-native'
import { useField } from 'formik'

import TextAreaInput from './TextAreaInput'
import Text from './Text'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: '#d73a4a',
  },
})

const FormikTextAreaInput = ({ name, ...props }) => {
  // console.log('props', props)

  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <>
      <TextAreaInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : (
        <Text style={{ height: 19 }}></Text>
      )}
    </>
  )
}

export default FormikTextAreaInput
