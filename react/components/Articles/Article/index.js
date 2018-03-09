import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class Article extends React.Component {
  render() {
    const { title, date, intl, link } = this.props

    return (
      <a
        className="dib flex flex-row space-between w-100 lh-copy link hover-no-underline hover-bg-near-white damp-green hover-dark-green"
        href={link}
        target="_blank"
      >
        <header className="w-75">
          <h3 className="mt0 f5 fw4 lh-copy font-display mid-gray">{title}</h3>
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
  intl: intlShape,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  date: PropTypes.string,
}

export default injectIntl(Article)
