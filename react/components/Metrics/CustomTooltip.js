import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

import { setToSeconds } from '../../utils'

const CustomTooltip = ({ payload, label, active, intl }) => {
  if (active) {
    const storeValue = setToSeconds(payload[0].value)
    const globalValue = setToSeconds(payload[1].value)

    return (
      <div className="bg-white f6 pa2 shadow-1">
        <p className="ma0 pa0 mb2">
          {intl.formatDate(label, {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </p>
        <div className="w-100">
          {Number.isInteger(parseInt(storeValue)) && (
            <div className="flex justify-between w-100">
              <span>{`${payload[0].name}: `}</span>
              <span className="rebel-pink">{storeValue}s</span>
            </div>
          )}
          {Number.isInteger(parseInt(globalValue)) && (
            <div className="flex justify-between w-100">
              <span>{`${payload[1].name}: `}</span>
              <span className="blue">{globalValue}s</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

CustomTooltip.propTypes = {
  payload: PropTypes.array,
  label: PropTypes.string,
  active: PropTypes.any,
  intl: intlShape,
}

export default injectIntl(CustomTooltip)
