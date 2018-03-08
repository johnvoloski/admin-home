import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'

import { globalVars } from '../../constants'

import SectionTitle from '../Titles/Section'
import SectionSubTitle from '../Titles/Section/SectionSubTitle'
import RenderTimeItem from './RenderTimeItem'
import ChartTabs from './ChartTabs'
import Chart from './Chart'

import { isEmpty, isNil } from 'ramda'

class MetricPageload extends React.Component {
  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  render() {
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
      <div className="sans-serif">
        <SectionTitle text="metric.pageload.title" />

        <div>
          <SectionSubTitle text="metric.pageload.description" />

          <div className="mv4">
            <section className="w-100 flex tr justify-end">
              {avgStoreLoad && (
                <RenderTimeItem
                  label={`metric.charttabs.${activeTab}`}
                  value={avgStoreLoad}
                  valueClass="vtex-rebelpink"
                  containerClass="w-33 w-25-l"
                  subvalue="s"
                  chartIsLoading={chartIsLoading}
                />
              )}
              {avgGlobalLoad && (
                <RenderTimeItem
                  label="metric.renderingTime.vtexstores"
                  value={avgGlobalLoad}
                  valueClass="vtex-youngblue"
                  containerClass="w-33 w-25-l"
                  subvalue="s"
                  chartIsLoading={chartIsLoading}
                />
              )}
              {bestPageLoadStore && (
                <RenderTimeItem
                  label="metric.renderingTime.best.label"
                  value={bestPageLoadStore}
                  valueClass="vtex-youngblue"
                  containerClass="w-33 w-25-l"
                  subvalue="s"
                  chartIsLoading={chartIsLoading}
                />
              )}
              {percentile > 0 && (
                <RenderTimeItem
                  label="metric.renderingTime.percentil.label"
                  value={percentile}
                  valueClass="vtex-rebelpink"
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
                {this.getI18nStr('metric.chart.emptydata')}
              </p>
            ) : (
              <Chart data={chartData} />
            )}
            <p>
              <span className="mr1">
                {this.getI18nStr('metric.charttabs.exterallink.text')}
              </span>
              <a className="link" target="_blank" href={globalVars.blogpost}>
                {this.getI18nStr('metric.charttabs.exterallink.label')}
              </a>
              {'.'}
            </p>
          </div>
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
