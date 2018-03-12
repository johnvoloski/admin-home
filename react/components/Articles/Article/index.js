import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class Article extends React.Component {
  render() {
    const { title, date, intl, link } = this.props

    return (
      <a
        className="dib flex flex-row space-between w-100 lh-copy link hover-no-underline hover-bg-near-white"
        href={link}
        target="_blank"
      >
        <header
          className="w-75"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <h3 className="mt0 f5 fw4 lh-copy font-display mid-gray truncate nowrap">
            {title}
          </h3>
        </header>
        <p className="tr w-25 ma0 lh-copy font-body f5 gray">
          {intl.formatDate(date, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </a>
    )
  }
}

Article.propTypes = {
  intl: intlShape.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
}

export default injectIntl(Article)
