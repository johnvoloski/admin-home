import React from 'react'
import PropTypes from 'prop-types'

class CardTitle extends React.Component {
  render() {
    return <header className="card-title f2 fw6">{this.props.children}</header>
  }
}

CardTitle.propTypes = {
  children: PropTypes.node,
}

export default CardTitle
