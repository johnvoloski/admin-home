import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

import { globalVars } from '../../constants'

import ChartTab from './ChartTab'
import DayButton from './DayButton'

class ChartTabs extends React.Component {
  handleDaysClick = days => this.props.tabClick(this.props.pagePath, days)

  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
    const { chartIsLoading, pagePath, tabClick, activeDayTab } = this.props

    return (
      <div className="chart-tabs flex justify-between items-baseline flex-wrap flex-nowrap-l flex-column flex-row-l f7 f6-l fw5">
        <div className="order-1 order-1-0">
          {globalVars.chartTabs.map(tab => (
            <ChartTab
              label={tab.label}
              key={tab.type}
              type={tab.type}
              tabClick={tabClick}
              isLoading={chartIsLoading}
              pagePath={pagePath}
            />
          ))}
        </div>

        <div className="order-0 order-1-l w-100 w-auto-l tr mb2 mb0-l">
          {globalVars.chartTimeFilters.map(tab => (
            <DayButton
              key={`dayFilter_${tab.value}`}
              value={tab.value}
              label={tab.label}
              onClick={this.handleDaysClick}
              isLoading={chartIsLoading}
              activeDayTab={activeDayTab}
            />
          ))}
        </div>
      </div>
    )
  }
}

ChartTabs.propTypes = {
  tabClick: PropTypes.func,
  chartIsLoading: PropTypes.bool,
  pagePath: PropTypes.string,
  activeDayTab: PropTypes.number,
  intl: intlShape,
}

export default injectIntl(ChartTabs)
