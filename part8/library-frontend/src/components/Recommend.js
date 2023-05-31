import React from 'react'
import { USER_Info } from '../queries'
import { useQuery } from '@apollo/client'

export default function Recommend({ show }) {
  const result = useQuery(USER_Info)

  console.log('recommend', result)

  if (!show) {
    return null
  }

  return (
    <div className='recommend'>
      <h2>Recommendations</h2>
      <div>books in your genre patterns</div>
      {result.length ? <div>have favorite Genre</div> : <div>no cotent..</div>}
    </div>
  )
}
