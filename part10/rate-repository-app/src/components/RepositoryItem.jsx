import React from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native'
import { useNavigate } from 'react-router-native'

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate()

  const handleK = (nb) => {
    if (nb > 1000) {
      let k = nb / 1000

      // console.log('k', k, k.toFixed(1), '' + k.toFixed(1).slice(-1))
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

  const handleToItem = (item) => {
    // console.log('handleToItem ', `${item.id}`)
    navigate(`${item.id}`)
  }

  //console.log('RepositoryItem ', item)
  return (
    <Pressable onPress={() => handleToItem(item)}>
      <View style={styles.container} testID='repositoryItem'>
        <View style={styles.flexContainer}>
          <Image
            style={styles.stretch}
            source={{
              uri: item.ownerAvatarUrl,
            }}
          />

          <View style={styles.flexContainerText}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}
            >
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
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    maxHeight: 300,
  },
  flexContainer: {
    flexDirection: 'row',
    maxHeight: 170,
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

export default RepositoryItem
