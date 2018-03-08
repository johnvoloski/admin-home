import React from 'react'
import PropTypes from 'prop-types'
import { globalVars } from '../../constants'

class Loader extends React.Component {
  getColor = color => {
    switch (color) {
      case globalVars.colors.pink.label:
        return globalVars.colors.pink.value
      case globalVars.colors.black.label:
        return globalVars.colors.black.value
      case globalVars.colors.gray.label:
        return globalVars.colors.gray.value
      case globalVars.colors.blue.label:
        return globalVars.colors.blue.value
      case globalVars.colors.purple.label:
        return globalVars.colors.purple.value
      default:
        return globalVars.colors.pink.value
    }
  }

  render() {
    return (
      <span className={this.props.containerClasses}>
        {this.props.breakBefore && <br />}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1"
          width="12"
          height="12"
          viewBox="0 0 128 128"
        >
          <g>
            <path
              d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z"
              fill={this.getColor(this.props.color)}
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="360 64 64"
              dur="600ms"
              repeatCount="indefinite"
            />
          </g>
        </svg>
        {this.props.breakAfter && <br />}
      </span>
    )
  }
}

Loader.propTypes = {
  color: PropTypes.string,
  breakBefore: PropTypes.bool,
  breakAfter: PropTypes.bool,
  containerClasses: PropTypes.string,
}

export default Loader
