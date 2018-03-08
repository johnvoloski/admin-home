import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import { isEmpty, isNil } from 'ramda'

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
    const { pageLoadData, activeTab, activeDayTab} = this.props
    this.handleMetricPageload(pageLoadData, activeTab, activeDayTab)
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

    const { activeDayTab, activeTab } = this.props

    return (
      <MetricPageload
        chartData={pageload}
        chartIsLoading={chartIsLoading}
        activeTab={activeTab}
        activeDayTab={activeDayTab}
        avgGlobalLoad={avgGlobalLoad}
        avgStoreLoad={avgStoreLoad}
        bestPageLoadStore={bestPageLoadStore}
        percentile={percentile}
      />
    )
  }
}

PageLoadWrapper.propTypes = {
  pageLoadData: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  activeDayTab: PropTypes.number.isRequired,
}

export default injectIntl(PageLoadWrapper)
