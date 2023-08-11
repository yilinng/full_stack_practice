import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native'
import Constants from 'expo-constants'
import { Link, useNavigate } from 'react-router-native'
import useMe from '../hooks/useMe'
import useSignOut from '../hooks/useSignOut'
import { useState } from 'react'
//import alert from '../utils/alert'

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
    alignItems: 'center',
  },
  link: {
    margin: 5,
  },
  signoutDiv: {
    height: 50,
  },
  signoutBtn: {
    backgroundColor: '#1E90FF',
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  // ...
})

const AppBar = () => {
  const [logoutLoading, setLogoutLoading] = useState(false)
  const { me, loading } = useMe()
  const [signout] = useSignOut()

  const navigate = useNavigate()

  console.log('me', me)

  if (loading) {
    return (
      <View>
        <ActivityIndicator
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size='large'
        />
      </View>
    )
  }

  if (logoutLoading) {
    return (
      <View>
        <ActivityIndicator
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size='large'
        />
      </View>
    )
  }

  //https://stackoverflow.com/questions/65481226/react-native-alert-alert-only-works-on-ios-and-android-not-web
  const handleSignOut = async () => {
    Alert.alert('Sign out information', 'Do you want to sign out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          signout()
          setLogoutLoading(true)
          navigate('/')
          setLogoutLoading(false)
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.linkList}>
        <ScrollView horizontal>
          <Link to='/' style={styles.link}>
            <Text style={styles.text}>Respositories</Text>
          </Link>

          {me ? (
            <>
              <Link to='/createReview' style={styles.link}>
                <Text style={styles.text}>Create a review</Text>
              </Link>

              <Link to='/myReview' style={styles.link}>
                <Text style={styles.text}>My review</Text>
              </Link>

              <Pressable onPress={handleSignOut}>
                <View style={styles.signoutDiv}>
                  <Text style={styles.signoutBtn}>Sign Out</Text>
                </View>
              </Pressable>
            </>
          ) : (
            <>
              <Link to='/signIn' style={styles.link}>
                <Text style={styles.text}>Sign In</Text>
              </Link>
              <Link to='/signUp' style={styles.link}>
                <Text style={styles.text}>Sign Up</Text>
              </Link>
            </>
          )}
        </ScrollView>
      </Pressable>
    </View>
  )
}

export default AppBar
