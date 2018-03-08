import React from 'react'
import PropTypes from 'prop-types'

const CustomizedYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-28} y={-12} dy={16} fontSize="12">
        {payload.value / 1000}
        {'/s'}
      </text>
    </g>
  )
}

CustomizedYAxisTick.propTypes = {
  payload: PropTypes.object,
  x: PropTypes.any,
  y: PropTypes.any,
}

export default CustomizedYAxisTick
