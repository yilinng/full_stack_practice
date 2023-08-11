import { Alert, Platform } from 'react-native'

const alertPolyfill = (title, description, options, extra) => {
  console.log(
    'title, description, options, extra',
    title,
    description,
    options,
    extra
  )
  const result = window.confirm([title, description].filter(Boolean).join('\n'))

  if (result) {
    //const confirmOption = options.find(({ style }) => style !== 'cancel')
    //confirmOption && confirmOption.onPress()
    return true
  } else {
    // const cancelOption = options.find(({ style }) => style === 'cancel')
    // cancelOption && cancelOption.onPress()
    return false
  }
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export default alert
