import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { intlShape, injectIntl } from 'react-intl'

import pageLoadQuery from '../queries/pageLoad.graphql'
import { valueToFloor, isYesterday, formatValue } from '../utils'
import moment from 'moment'

import MetricPageload from './Metrics/'

class PageLoadWrapper extends Component {
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
    this.pageLoadKey = this.props.intl.formatMessage({
      id: 'metric.pageload.legend.pageLoadStore',
    })
    this.pageLoadGlobalKey = this.props.intl.formatMessage({
      id: 'metric.pageload.legend.pageLoadGlobal',
    })
  }

  componentWillReceiveProps(nextProps) {
    const {
      data: { pageLoadMetric, loading },
      pagePath,
      timePeriod,
    } = nextProps
    this.setState({ chartIsLoading: loading })
    if (!loading) {
      this.handleMetricPageload(pageLoadMetric, pagePath, timePeriod)
    }
  }

  handleMetricPageload(data, type, days) {
    const formattedData = []

    if (!data) {
      return
    }
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
      avgGlobalLoad,
      avgStoreLoad,
      bestPageLoadStore,
      percentile,
      chartIsLoading,
    } = this.state

    const { pagePath, timePeriod, tabClick } = this.props

    return (
      <MetricPageload
        chartData={pageload}
        chartIsLoading={chartIsLoading}
        tabClick={tabClick}
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
  intl: intlShape,
  pagePath: PropTypes.string.isRequired,
  timePeriod: PropTypes.number.isRequired,
  tabClick: PropTypes.func.isRequired,
}

export default compose(
  graphql(pageLoadQuery, {
    options: ({ pagePath, timePeriod }) => ({
      ssr: false,
      variables: { pagePath, timePeriod },
    }),
  }),
  injectIntl,
)(PageLoadWrapper)
