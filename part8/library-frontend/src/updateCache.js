export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery({ query }, ({ allBooks, allAuthors }) => {
    console.log('query', query)
    console.log('allBooks', allBooks)
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
      allAuthors: uniqByName(allAuthors.concat(addedBook.author)),
    }
  })
}
