import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

class ChartTab extends React.Component {
  handleClick = () => this.props.tabClick(this.props.type, this.props.activeDayTab)

  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
    const { activePage, type, label, isLoading } = this.props
    return (
      <button
        className={
          'chart-tab br--top pr2 pl2 relative bl br-0 bt bb b--black-20 ' +
          (activePage === type
            ? ' active elite-purple bg-near-white bb--red '
            : ' bb-1 bg-white ') +
          (isLoading && ' loading ')
        }
        style={{
          top: '1px',
          transition: 'color 0.2s ease',
        }}
        type="button"
        onClick={this.handleClick}
        disabled={isLoading}
      >
        {this.getI18nStr(label)}
      </button>
    )
  }
}

ChartTab.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  tabClick: PropTypes.func,
  isLoading: PropTypes.bool,
  activePage: PropTypes.string,
  activeDayTab: PropTypes.number,
  intl: intlShape,
}

export default injectIntl(ChartTab)
