import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {graphql, compose} from 'react-apollo'
import { intlShape, injectIntl } from 'react-intl'
import { isEmpty, isNil } from 'ramda'

import pageLoadQuery from '../queries/pageLoad.graphql'
import { setToSeconds, valueToFloor, isYesterday, formatValue } from '../utils'

import MetricPageload from './Metrics/'

class PageLoadWrapper extends Component {
  getI18nStr = id => this.props.intl.formatMessage({ id })

  constructor(props) {
    super(props)
    this.state = {
      pageload: null,
      bestPageLoadStore: null,
      avgGlobalLoad: null,
      avgStoreLoad: null,
      percentile: null,
      chartIsLoading: false,
    }
  }

  componentDidMount() {
    this.pageLoadKey = this.getI18nStr('metric.pageload.legend.pageLoadStore')
    this.pageLoadGlobalKey = this.getI18nStr('metric.pageload.legend.pageLoadGlobal')

  }

  componentWillReceiveProps(nextProps) {
    const { data: { pageLoadMetric, loading }, pagePath, timePeriod } = nextProps
    if (!loading) {
      this.handleMetricPageload(pageLoadMetric, pagePath, timePeriod)
    }
  }

  handleMetricPageload(data, type, days) {
    const formattedData = []

    data.knotList.forEach(item => {
      const formatedItem = {
        date: item.date,
        [this.pageLoadKey]: valueToFloor(item.pageLoad),
        [this.pageLoadGlobalKey]: valueToFloor(item.pageLoadGlobal),
      }

      if (
        !Number.isNaN(formatedItem.Loja) &&
        !Number.isNaN(formatedItem.Global) &&
        (days !== 0 || (days === 0 && !isYesterday(moment(formatedItem.date))))
      ) {
        formattedData.push(formatedItem)
      }
    })

    const avgGlobalLoad = formatValue(data.pageLoadGlobalAvg)
    const avgStoreLoad = formatValue(data.pageLoadAvg)
    const bestPageLoadStore = formatValue(data.vtexTop)
    const percentile = data.percentile

    this.setState({
      pageload: formattedData,
      avgGlobalLoad,
      avgStoreLoad,
      bestPageLoadStore,
      percentile,
      chartIsLoading: false,
    })
  }

  render() {
    const {
      pageload,
      chartData,
      avgGlobalLoad,
      avgStoreLoad,
      bestPageLoadStore,
      percentile,
      chartIsLoading,
    } = this.state

    const { pagePath, timePeriod, handleChange } = this.props

    return (
      <MetricPageload
        chartData={pageload}
        chartIsLoading={chartIsLoading}
        tabClick={handleChange}
        activeTab={pagePath}
        activeDayTab={timePeriod}
        avgGlobalLoad={avgGlobalLoad}
        avgStoreLoad={avgStoreLoad}
        bestPageLoadStore={bestPageLoadStore}
        percentile={percentile}
      />
    )
  }
}

PageLoadWrapper.propTypes = {
  pagePath: PropTypes.string.isRequired,
  timePeriod: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default compose(
  graphql(pageLoadQuery, {
    options: ({ pagePath, timePeriod }) => ({ ssr: false, variables: {pagePath, timePeriod} }),
  }),
  injectIntl
)(PageLoadWrapper)
