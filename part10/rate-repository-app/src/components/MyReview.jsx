import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useGetCurrentUser } from '../hooks/useGetCurrentUser'
import useDeleteReview from '../hooks/useDeleteReview'

const handleDate = (text) => {
  let objectDate = new Date(text).toISOString().split('T')[0]
  //2023-07-31
  //https://stackoverflow.com/questions/2388115/get-locale-short-date-format-using-javascript
  const splitDate = objectDate.split('-')
  //['2023', '07', '31']
  let newDateToYear = []
  ;[...splitDate].reverse().map((item, idx) => {
    newDateToYear.push(item)
    if (idx === splitDate.length - 1) {
      return
    }
    newDateToYear.push('.')
  })
  let final = newDateToYear.join('')
  //console.log('newDateToYear', final)
  return final
}

const ReviewItem = ({ review, handleDelete }) => {
  const { text, rating, createdAt, repository } = review

  console.log('review', review)

  const truncateText = (text) => {
    if (text && text.length > 300) {
      //  setShowBtn(true)
      return text.substring(0, 300) + '...'
    }
    return text
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewContainer1}>
        <View style={styles.reviewRate}>
          <Text style={styles.reviewRateText}>{rating}</Text>
        </View>

        <View style={styles.reviewTextDiv}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            {repository.fullName}
          </Text>
          <Text style={{ fontWeight: 'bold', color: 'gray' }}>
            {handleDate(createdAt)}
          </Text>
          <Text style={styles.reviewTextDivText}>{truncateText(text)}</Text>
        </View>
      </View>

      <View style={styles.btnDiv}>
        <Pressable style={styles.btnViewSize}>
          <Text style={styles.btnfont}>View repository</Text>
        </Pressable>
        <Pressable
          style={styles.btnDeleteSize}
          onPress={() => handleDelete(review)}
        >
          <Text style={styles.btnfont}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
  // Single review item
}

const MyReview = () => {
  //https://www.apollographql.com/docs/react/data/queries/#refetching
  const { data, loading, refetch } = useGetCurrentUser({ includeReviews: true })
  const [deleteReview] = useDeleteReview()

  const reviews = data ? data.me.reviews.edges.map((edge) => edge.node) : []

  const handleDelete = (review) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteReview({ deleteReviewId: review.id })
            refetch({ includeReviews: true })
            console.log('delete success')
          },
        },
      ]
    )
  }

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

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} handleDelete={handleDelete} />
      )}
      keyExtractor={({ id }) => id}
    />
  )
}

const styles = StyleSheet.create({
  reviewContainer: {
    maxHeight: 400,
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 5,
    padding: 10,
  },
  reviewContainer1: {
    maxHeight: 250,
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 5,
    flexDirection: 'row',
    padding: 10,
  },
  reviewRate: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#1E90FF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewRateText: {
    textAlign: 'center',
    color: '#1E90FF',
    fontWeight: '700',
    fontSize: 20,
  },
  reviewTextDiv: {
    marginLeft: 10,
  },
  reviewTextDivText: {
    width: 300,
    maxHeight: 150,
    color: 'gray',
  },
  btnDiv: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    maxHeight: 80,
  },
  btnViewSize: {
    flex: 0.4,
    backgroundColor: '#1E90FF',
    padding: 8,
    borderRadius: 10,
  },
  btnfont: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  btnDeleteSize: {
    flex: 0.4,
    backgroundColor: '#DC143C',
    padding: 8,
    borderRadius: 10,
  },
})

export default MyReview
