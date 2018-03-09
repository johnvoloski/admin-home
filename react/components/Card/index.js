import React from 'react'
import PropTypes from 'prop-types'

class Card extends React.Component {
  render() {
    return (
      <div
        className={`"card pa6 b2 ba br3 bw1 b--washed-blue bg-white ${
          this.props.className
        }`}
      >
        {this.props.children}
      </div>
    )
  }
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Card
