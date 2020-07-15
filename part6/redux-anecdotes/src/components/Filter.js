import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.updateFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={ style }>
      filter <input onChange={ handleChange } />
    </div>
  )
}

const mapDispatchToProps = {
  updateFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)