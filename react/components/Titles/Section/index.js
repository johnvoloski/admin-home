import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class SectionTitle extends React.Component {
  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
    const { link, text } = this.props

    return (
      <h2 className="mt4 mb0 f3 lh-copy font-display">
        {link ? (
          <a
            target="_blank"
            href={link}
            className="transition-opacity-02 hover-no-underline link purple-manage hover-purple-manage hover-o-70"
          >
            {this.getI18nStr(text)}

            <svg
              className="h-15px w-auto ml3 mb3"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>{text}</title>
              <g fill="none" fillRule="evenodd">
                <path d="M-3-3h24v24H-3" />
                <path
                  className="fill-purple-manage"
                  d="M16 16H2V2h7V0H2C.89 0 0 .9 0 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V9h-2v7zM11 0v2h3.59l-9.83 9.83 1.41 1.41L16 3.41V7h2V0h-7z"
                  fillRule="nonzero"
                />
              </g>
            </svg>
          </a>
        ) : (
          this.getI18nStr(text)
        )}
      </h2>
    )
  }
}

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
  xtraClass: PropTypes.string,
  link: PropTypes.string,
  intl: intlShape,
}

export default injectIntl(SectionTitle)
