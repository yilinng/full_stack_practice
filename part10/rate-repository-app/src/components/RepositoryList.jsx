import React, { useState, useEffect } from 'react'
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native'

import { useDebounce } from 'use-debounce'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useSearchKeyword } from '../hooks/useSearchKeyword'
import RepositoryPick from './RepositoryPick'
import handleOrder from '../utils/handleOrder'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const [selectedOrder, setSelectedOrder] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredResults, setFilteredResults] = useState([])
  const [isPress, setIsPress] = useState(false)
  const [xIsPress, setXIsPress] = useState(false)
  //const [passVal, setPassVal] = useState('')

  //https://www.npmjs.com/package/use-debounce
  //https://usehooks.com/usedebounce

  const [value] = useDebounce(searchText, 500)
  const { data } = useSearchKeyword({
    searchKeyword: value,
  })

  const orderList = [
    'Lastest repositories',
    'Highest rated repositories',
    'Lowest rated repositories',
  ]

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  //console.log('repositoryNodes', repositoryNodes)
  useEffect(() => {
    handleOrder({ selectedOrder, repositoryNodes })
  }, [selectedOrder])

  const handleValueChange = (values) => {
    console.log('init handleChange', values)

    if (values.searchText && repositoryNodes) {
      const filterById = repositoryNodes.filter((node) =>
        node.id.includes(values.searchText)
      )

      console.log('filterById', filterById)
      //react state change cause  Formik value reset
      setTimeout(() => {
        console.log('init 800s run', values)
        //setFilteredResults(filterById)
      }, 800)
    }
  }

  const handleSubmit = (values) => {
    // console.log('handleSubmit', values)
    if (values.searchText) {
      setIsPress(true)
      setSearchText(values.searchText)
      console.log('data', data)

      setTimeout(() => {
        setIsPress(false)
      }, 300)
    }
  }
  //https://stackoverflow.com/questions/55583815/formik-how-to-reset-form-after-confirmation
  const handleReset = (values) => {
    //  setIsPress(false)
    if (values.searchText) {
      //console.log('init handleReset', values)
      values = {}
      setFilteredResults([])
      setXIsPress(true)

      setTimeout(() => {
        setXIsPress(false)
      }, 300)
    }
  }

  const handleData = () => {
    /*
    if (isPress) {
      // console.log('filteredResults', filteredResults)
      return filteredResults
    }
    */
    return handleOrder({ selectedOrder, repositoryNodes })
  }

  const renderItem = ({ item }) => {
    return <RepositoryItem item={item} />
  }

  return (
    <FlatList
      data={handleData()}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={() => (
        <RepositoryPick
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          orderList={orderList}
          onSubmit={handleSubmit}
          onReset={handleReset}
          handleValueChange={handleValueChange}
          filteredResults={filteredResults}
          isPress={isPress}
          xIsPress={xIsPress}
          keyboardShouldPersistTaps='always'
          //passVal={passVal}
        />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

const RepositoryList = () => {
  const { repositories, loading, fetchMore } = useRepositories({ first: 8 })

  //console.log('repositories', repositories)

  const onEndReach = () => {
    fetchMore
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
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
