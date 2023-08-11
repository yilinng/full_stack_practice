import React from 'react'
import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce'

import { Formik } from 'formik'
import SearchForm from './SearchForm'
import theme from '../theme'

const FilterList = ({ filteredResults }) => {
  const navigate = useNavigate()
  const [value] = useDebounce(filteredResults, 800)

  console.log('FilterList filteredResults ', value)

  const handleToItem = (item) => {
    setTimeout(() => {
      console.log('after 500s navigate item', item)
      navigate(`${item.id}`)
    }, 500)
  }
  return (
    <View style={styles.filteredcontainer}>
      {value.length ? (
        <FlatList
          data={value}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleToItem(item)}>
              <Text style={styles.filtereditem}>{item.id}</Text>
            </Pressable>
          )}
        />
      ) : (
        <View>
          <Text style={styles.filtereditem}>No results</Text>
        </View>
      )}
    </View>
  )
}

const RepositoryPick = ({
  selectedOrder,
  setSelectedOrder,
  orderList,
  onSubmit,
  onReset,
  handleValueChange,
  filteredResults,
  isPress,
  xIsPress,
  //  passVal,
}) => {
  const initialValues = {
    searchText: '',
  }

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        onReset={onReset}
        handleValueChange={handleValueChange}
      >
        {({ handleSubmit, handleReset, handleChange, handleBlur, values }) => (
          <SearchForm
            handleSubmit={handleSubmit}
            handleReset={handleReset}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleValueChange={handleValueChange}
            isPress={isPress}
            xIsPress={xIsPress}
            values={values}
            //passVal={passVal}
          />
        )}
      </Formik>

      {filteredResults.length ? (
        <FilterList filteredResults={filteredResults} />
      ) : (
        <View>
          <Text></Text>
        </View>
      )}

      <Picker
        style={styles.pickDiv}
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        {orderList.map((item) => (
          <Picker.Item
            label={item}
            value={item}
            key={item}
            style={styles.pickItem}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  pickDiv: {
    height: 50,
    backgroundColor: theme.colors.mainBackground,
    fontWeight: '500',
    fontSize: 20,
    borderColor: theme.colors.mainBackground,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  filteredcontainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 22,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -10,
    borderRadius: 10,
  },
  filtereditem: {
    padding: 10,
    fontSize: 18,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
})

export default RepositoryPick
