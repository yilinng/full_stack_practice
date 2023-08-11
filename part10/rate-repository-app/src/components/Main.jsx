import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import SingleRepository from './SingleRepository'
import AppBar from './AppBar'
import SignIn from './SignIn'
import SignUp from './SignUp'
import CreateReview from './CreateReview'
import MyReview from './MyReview'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/signIn' element={<SignIn />} exact />
        <Route path='/signUp' element={<SignUp />} exact />
        <Route path='/createReview' element={<CreateReview />} exact />
        <Route path='/myReview' element={<MyReview />} exact />

        <Route path='/' element={<RepositoryList />} exact />
        <Route path='/:id' element={<SingleRepository />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}

export default Main
