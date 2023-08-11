//https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property

const handleLastest = (repositoryNodes) => {
  let isDescending = true //set to false for ascending

  return repositoryNodes.sort((a, b) =>
    isDescending
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
}

const handleRating = (repositoryNodes, isDescending) => {
  // let isDescending = true //set to false for ascending
  return repositoryNodes.sort((a, b) =>
    isDescending
      ? b.ratingAverage - a.ratingAverage
      : a.ratingAverage - b.ratingAverage
  )
}

const handleOrder = ({ selectedOrder, repositoryNodes }) => {
  if (selectedOrder.includes('rated')) {
    if (selectedOrder.includes('Highest')) {
      //  console.log('selectedOrder hight rating', selectedOrder)
      return handleRating(repositoryNodes, true)
    }
    //console.log('selectedOrder lowest rating', selectedOrder)
    return handleRating(repositoryNodes, false)
  }
  return handleLastest(repositoryNodes)
}

export default handleOrder
