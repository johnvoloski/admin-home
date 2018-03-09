import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

class DayButton extends React.Component {
  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  handleClick = () => this.props.onClick(this.props.value)

  render() {
    return (
      <button
        className={
          'chart-day-tab bn mt0 mb0 pt0 pb0 ' +
          (this.props.activeDayTab === this.props.value
            ? ' active elite-purple bg-near-white '
            : ' bg-white ') +
          (this.props.isLoading && ' loading ')
        }
        type="button"
        onClick={this.handleClick}
        disabled={this.props.isLoading}
      >
        {this.getI18nStr(`metric.charttabs.days.${this.props.label}`)}
      </button>
    )
  }
}

DayButton.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  activeDayTab: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
  intl: intlShape,
}

export default injectIntl(DayButton)
