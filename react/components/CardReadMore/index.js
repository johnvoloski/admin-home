import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class CardReadMore extends React.Component {
  render() {
    const { intl } = this.props

    return (
      <p className="tr b f5">
        <a href={this.props.link} className="link blue" target="_blank">
          <span>{intl.formatMessage({ id: 'see.more' })}</span>
          <span className="relative" style={{ top: '7px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="#368DF7">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </g>
            </svg>
          </span>
        </a>
      </p>
    )
  }
}

CardReadMore.propTypes = {
  link: PropTypes.string,
  intl: intlShape,
}

export default injectIntl(CardReadMore)
