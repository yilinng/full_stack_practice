import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native'

const RepositoryItem = ({ item }) => {
  // const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff'
  // const color = item.id === selectedId ? 'white' : 'black'

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

  //console.log('RepositoryItem ', item)
  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image style={styles.stretch} source={item.ownerAvatarUrl} />

        <View style={styles.flexContainerText}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, marginBottom: 10 }}>
            {item.fullName}
          </Text>
          <Text style={{ color: 'gray', marginBottom: 10, fontSize: 16 }}>
            {item.description}
          </Text>
          <Button style={styles.button} title={item.language} />
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    height: 300,
  },
  flexContainer: {
    flexDirection: 'row',
    height: 150,
  },
  flexContainerNb: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    resizeMode: 'stretch',
    borderRadius: 2,
    margin: 15,
  },
  button: {
    color: 'white',
    backgroundColor: 'blue',
    margin: 'auto',
  },
})

export default RepositoryItem
