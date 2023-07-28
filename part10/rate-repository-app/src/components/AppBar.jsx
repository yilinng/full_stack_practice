import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    height: 100,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  linkList: {
    display: 'flex',
    marginTop: 50,
  },
  link: {
    margin: 5,
  },
  // ...
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.linkList}>
        <ScrollView horizontal>
          <Link to='/' style={styles.link}>
            <Text style={styles.text}>Respositories</Text>
          </Link>
          <Link to='/signIn' style={styles.link}>
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </ScrollView>
      </Pressable>
    </View>
  )
}

export default AppBar
