import React from 'react'
import PropTypes from 'prop-types'

class CardReadMore extends React.Component {
  render() {
    return (
      <p className="tr b f5">
        <a
          href={this.props.link}
          style={{
            color: '#368DF7',
          }}
          className="link"
        >
          See more <span className="chevron-right f3">›</span>
        </a>
      </p>
    )
  }
}

CardReadMore.propTypes = {
  link: PropTypes.string,
}

export default CardReadMore
