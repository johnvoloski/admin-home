import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

import { globalVars } from '../../constants'

import RenderTimeItem from './RenderTimeItem'
import ChartTabs from './ChartTabs'
import Chart from './Chart'

import { isEmpty, isNil } from 'ramda'

class MetricPageload extends React.Component {
  render() {
    const { intl } = this.props

    const {
      chartData,
      avgGlobalLoad,
      avgStoreLoad,
      bestPageLoadStore,
      percentile,
      activeTab,
      activeDayTab,
      chartIsLoading,
    } = this.props

    return (
      <div>
        <div className="mv4">
          <section className="w-100 flex tr justify-end">
            {avgStoreLoad && (
              <RenderTimeItem
                label={`metric.charttabs.${activeTab}`}
                value={avgStoreLoad}
                valueClass="rebel-pink"
                containerClass="w-33 w-25-l"
                subvalue="s"
                chartIsLoading={chartIsLoading}
              />
            )}
            {avgGlobalLoad && (
              <RenderTimeItem
                label="metric.renderingTime.vtexstores"
                value={avgGlobalLoad}
                valueClass="blue"
                containerClass="w-33 w-25-l"
                subvalue="s"
                chartIsLoading={chartIsLoading}
              />
            )}
            {bestPageLoadStore && (
              <RenderTimeItem
                label="metric.renderingTime.best.label"
                value={bestPageLoadStore}
                valueClass="blue"
                containerClass="w-33 w-25-l"
                subvalue="s"
                chartIsLoading={chartIsLoading}
              />
            )}
            {percentile > 0 && (
              <RenderTimeItem
                label="metric.renderingTime.percentil.label"
                value={percentile}
                valueClass="rebel-pink"
                containerClass="w-33 w-25-l"
                chartIsLoading={chartIsLoading}
              />
            )}
          </section>
        </div>
        <div>
          <ChartTabs
            tabClick={this.props.tabClick}
            chartIsLoading={chartIsLoading}
            pagePath={activeTab}
            activeDayTab={activeDayTab}
          />
          {isEmpty(chartData) || isNil(chartData) ? (
            <p className="tc mb5 mt5 f6 i mid-gray">
              {intl.formatMessage({ id: 'metric.chart.emptydata' })}
            </p>
          ) : (
            <Chart data={chartData} />
          )}
          <p>
            <span className="mr1">
              {intl.formatMessage({ id: 'metric.charttabs.exterallink.text' })}
            </span>
            <a
              style={{
                color: '#368DF7',
              }}
              className="link"
              target="_blank"
              href={globalVars.blogpost}
            >
              {intl.formatMessage({ id: 'metric.charttabs.exterallink.label' })}
            </a>
            {'.'}
          </p>
        </div>
      </div>
    )
  }
}

MetricPageload.propTypes = {
  chartData: PropTypes.array,
  bestPageLoadStore: PropTypes.number,
  avgGlobalLoad: PropTypes.number,
  avgStoreLoad: PropTypes.number,
  percentile: PropTypes.number,
  tabClick: PropTypes.func,
  chartIsLoading: PropTypes.bool,
  activeTab: PropTypes.string,
  activeDayTab: PropTypes.number,
  intl: intlShape,
}

export default injectIntl(MetricPageload)
