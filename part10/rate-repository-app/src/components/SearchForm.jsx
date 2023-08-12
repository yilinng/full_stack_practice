import { useEffect } from 'react'
import {
  View,
  Pressable,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native'
//https://fontawesome.com/docs/web/use-with/react-native
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faX } from '@fortawesome/free-solid-svg-icons/faX'
import { DismissKeyboard } from './tool/DismissKeyboard'
//https://stackoverflow.com/questions/66372097/updating-one-of-the-formik-initial-values-with-state-resets-all-other-values
//https://formik.org/docs/guides/react-native
//https://stackoverflow.com/questions/55583815/formik-how-to-reset-form-after-confirmation
const SearchForm = ({
  handleSubmit,
  handleReset,
  handleChange,
  handleValueChange,
  handleBlur,
  isPress,
  xIsPress,
  values,
  loading,
}) => {
  useEffect(() => {
    if (values.searchText) {
      handleValueChange(values)
    }
  }, [values.searchText])

  return (
    <DismissKeyboard>
      <View style={styles.searchDiv}>
        {loading ? (
          <ActivityIndicator
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              flexDirection: 'column',
              marginTop: 250,
            }}
            size='large'
          />
        ) : (
          <Pressable onPress={handleSubmit}>
            <View>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={isPress ? styles.pressIcon : styles.searchIcon}
              />
            </View>
          </Pressable>
        )}

        <View style={{ backgroundColor: '#eee', flex: 0.9 }}>
          <TextInput
            onChangeText={handleChange('searchText')}
            onBlur={handleBlur('searchText')}
            value={values.searchText}
            style={styles.searchText}
          />
        </View>

        <Pressable onPress={handleReset}>
          <View>
            <FontAwesomeIcon
              icon={faX}
              style={xIsPress ? styles.pressIcon : styles.cancelIcon}
            />
          </View>
        </Pressable>
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  searchDiv: {
    borderColor: '#DDD',
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 5,
  },
  searchIcon: {
    flex: 0.1,
    width: 30,
    height: 30,
  },
  cancelIcon: {
    flex: 0.1,
    width: 30,
    height: 30,
  },
  pressIcon: {
    flex: 0.1,
    width: 30,
    height: 30,
    elevation: 5,
    backgroundColor: '#eee',
  },
  searchText: {
    flex: 0.8,
    fontSize: 25,
    borderColor: '#eee',
  },
})

export default SearchForm
