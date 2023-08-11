import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
} from 'react-native'
import { useParams } from 'react-router-native'
import { useRepository } from '../hooks/useRepository'

const RepositoryInfo = ({ repository }) => {
  // Repository's information implemented in the previous exercise

  const item = repository ? repository : []

  const handleK = (nb) => {
    if (nb > 1000) {
      let k = nb / 1000

      //  console.log('k', k, k.toFixed(1), '' + k.toFixed(1).slice(-1))
      //last number is 0
      let lastNb = '' + k.toFixed(1).slice(-1)
      if (lastNb === '0') {
        return `${k.toFixed()}k`
      }

      return `${k.toFixed(1)}k`
    }
    return nb
  }

  const truncateText = (text) => {
    if (text && text.length > 60) {
      return text.substring(0, 60) + '...'
    }
    return text
  }

  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.flexContainer}>
        <Image
          style={styles.stretch}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />

        <View style={styles.flexContainerText}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}>
            {item.fullName}
          </Text>
          <Text style={{ color: 'gray', marginBottom: 10, fontSize: 15 }}>
            {truncateText(item.description)}
          </Text>
          <Pressable>
            <Text style={styles.button}>{item.language}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.flexContainerNb}>
        <View>
          <Text style={styles.flexContainerNbText}>
            {handleK(item.stargazersCount)}
          </Text>
          <Text style={styles.flexContainerNbText1}>Stars</Text>
        </View>

        <View>
          <Text style={styles.flexContainerNbText}>
            {handleK(item.forksCount)}
          </Text>
          <Text style={styles.flexContainerNbText1}>Forks</Text>
        </View>

        <View>
          <Text style={styles.flexContainerNbText}>
            {handleK(item.reviewCount)}
          </Text>
          <Text style={styles.flexContainerNbText1}>Reviews</Text>
        </View>

        <View>
          <Text style={styles.flexContainerNbText}>
            {handleK(item.ratingAverage)}
          </Text>
          <Text style={styles.flexContainerNbText1}>Rating</Text>
        </View>
      </View>
      <Pressable>
        <Text style={styles.ButtonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  )
}

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

const ReviewItem = ({ review }) => {
  //console.log('review', review)

  //const [showBtn, setShowBtn] = useState(false)

  const { user, text, rating, createdAt } = review

  const truncateText = (text) => {
    if (text && text.length > 300) {
      //  setShowBtn(true)
      return text.substring(0, 300) + '...'
    }
    return text
  }

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRate}>
        <Text style={styles.reviewRateText}>{rating}</Text>
      </View>

      <View style={styles.reviewTextDiv}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {user.username}
        </Text>
        <Text style={{ fontWeight: 'bold', color: 'gray' }}>
          {handleDate(createdAt)}
        </Text>
        <Text style={styles.reviewTextDivText}>{truncateText(text)}</Text>
      </View>
    </View>
  )
  // Single review item
}

const SingleRepository = () => {
  //const navigate = useNavigate()
  const repositoryId = useParams().id
  const { repository, fetchMore } = useRepository({
    repositoryId,
  })

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  const onEndReach = () => {
    fetchMore
  }
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      // ...
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    maxHeight: 300,
    marginBottom: 5,
    padding: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    height: 170,
    alignItems: 'center',
  },
  flexContainerNb: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flexContainerNbText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  flexContainerNbText1: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
    textAlign: 'center',
  },
  flexContainerText: {
    flexDirection: 'column',
    width: 250,
    marginLeft: 20,
    marginTop: 15,
  },
  stretch: {
    width: 70,
    height: 70,
    borderRadius: 2,
    margin: 15,
  },

  ButtonText: {
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#1E90FF',
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  reviewContainer: {
    maxHeight: 300,
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
    width: 270,
    color: 'gray',
  },
  button: {
    maxWidth: 120,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#1E90FF',
    padding: 5,
    fontSize: 18,
    fontWeight: '700',
    borderRadius: 7,
  },
})

export default SingleRepository
