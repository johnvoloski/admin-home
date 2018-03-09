import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

class ChartTab extends React.Component {
  handleClick = () => this.props.tabClick(this.props.type)

  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
    return (
      <button
        className={
          'chart-tab br--top pr2 pl2 relative bl br-0 bt bb b--black-20 ' +
          (this.props.activeTab === this.props.type
            ? ' active elite-purple bg-near-white bb--red '
            : ' bb-1 bg-white ') +
          (this.props.isLoading && ' loading ')
        }
        style={{
          top: '1px',
          transition: 'color 0.2s ease',
        }}
        type="button"
        onClick={this.handleClick}
        disabled={this.props.isLoading}
      >
        {this.getI18nStr(this.props.label)}
      </button>
    )
  }
}

ChartTab.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  tabClick: PropTypes.func,
  isLoading: PropTypes.bool,
  pagePath: PropTypes.string,
  intl: intlShape,
}

export default injectIntl(ChartTab)
