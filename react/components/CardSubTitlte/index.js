import React from 'react'
import PropTypes from 'prop-types'

class CardSubTitlte extends React.Component {
  render() {
    return <p className="card-title f4 gray">{this.props.children}</p>
  }
}

CardSubTitlte.propTypes = {
  children: PropTypes.node,
}

export default CardSubTitlte
