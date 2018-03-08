import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class ColumnTitle extends React.Component {
  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
    const { title, subTitle } = this.props

    return (
      <div>
        <h1 className="font-display f2 f1-ns fw6 mt4 mb2">
          {this.getI18nStr(title)}
        </h1>
        {subTitle && (
          <h2 className="mt0 f4 lh-copy mid-gray f1 fw4 lh-title font-display">
            {this.getI18nStr(subTitle)}
          </h2>
        )}
      </div>
    )
  }
}

ColumnTitle.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  intl: intlShape,
}

export default injectIntl(ColumnTitle)
