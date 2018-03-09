import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class CardReadMore extends React.Component {
  render() {
    const { intl } = this.props

    return (
      <p className="tr b f5">
        <a
          href={this.props.link}
          style={{
            color: '#368DF7',
          }}
          className="link"
          target="_blank"
        >
          {intl.formatMessage({ id: 'see.more' })}{' '}
          <span className="chevron-right f3">›</span>
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
