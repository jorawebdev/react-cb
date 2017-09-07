import React from 'react'
import { connect } from 'react-redux'
import { countVal } from '../actions'

let Count = ({ dispatch }) => {
  let count = 0

  return (
    <div>
      <h4>Count Component</h4>
      <a href="" onClick={
        e => {
          e.preventDefault()
          dispatch(countVal(++count))
        }
      }>Count</a>
    </div>
  )
}
Count = connect()(Count)

export default Count
