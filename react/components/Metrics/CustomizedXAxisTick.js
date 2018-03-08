import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

const CustomizedXAxisTick = ({ x, y, payload, intl }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-18} y={0} dy={16} fontSize="12">
        {intl.formatDate(payload.value, {
          day: 'numeric',
          month: 'short',
        })}
      </text>
    </g>
  )
}

CustomizedXAxisTick.propTypes = {
  payload: PropTypes.object,
  x: PropTypes.any,
  y: PropTypes.any,
  intl: intlShape,
}

export default injectIntl(CustomizedXAxisTick)
