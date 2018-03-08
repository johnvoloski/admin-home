import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

class SectionSubTitle extends React.Component {
  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
    return (
      <h2 className="mt0 f5 lh-copy mid-gray f1 fw4 lh-title font-display">
        {this.getI18nStr(this.props.text)}
      </h2>
    )
  }
}

SectionSubTitle.propTypes = {
  text: PropTypes.string.isRequired,
  intl: intlShape,
}

export default injectIntl(SectionSubTitle)
