import React from 'react'
import PropTypes from 'prop-types'

import Loader from '../Loader'
import { injectIntl, intlShape } from 'react-intl'

class RenderTimeItem extends React.Component {
  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
    return (
      <div className={this.props.containerClass}>
        {this.props.label && this.getI18nStr(this.props.label)}

        {this.props.chartIsLoading ? (
          <Loader breakBefore />
        ) : (
          <div className={this.props.valueClass}>
            <span className={(this.props.large ? ' f1 ' : ' f4') + ' fw8 '}>
              {this.props.value}
            </span>
            {this.props.subvalue && (
              <span className="fw4">{this.props.subvalue}</span>
            )}
          </div>
        )}
      </div>
    )
  }
}

RenderTimeItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  subvalue: PropTypes.any,
  valueClass: PropTypes.string,
  containerClass: PropTypes.string,
  large: PropTypes.bool,
  chartIsLoading: PropTypes.bool.isRequired,
  intl: intlShape,
}

export default injectIntl(RenderTimeItem)
