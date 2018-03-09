// const cookie = require('cookie-dough')()

import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { intlShape, injectIntl } from 'react-intl'

import homeDataQuery from '../queries/home.graphql'

import ColumnTitle from '../components/Titles/Column'
import DataItemsList from '../components/DataItems/DataItemsList'
import PageLoadWrapper from '../components/PageLoadWrapper'
import DataItem from '../components/DataItems/DataItem'
import Performance from './Performance'

import { globalVars } from '../constants'
import * as endpoints from '../utils/endpoints'

import axios from 'axios'
import moment from 'moment'
import { isNil } from 'ramda'

// const url = window.location.host
const baseUrl = endpoints.smartlinkBaseUrl
let account = globalVars.anDefault

// if (url.includes('localhost')) {
//   account = globalVars.anDefault
// } else {
//   account = url
//     .split('.')[0]
//     .split('--')
//     .pop()
// }

// let clientAutCookie = globalVars.tempCookie
// cookie.get('VtexIdclientAutCookie')
// if (!clientAutCookie) {
//   clientAutCookie = globalVars.cookie
// }

let pageLoadKey = ''
let pageLoadGlobalKey = ''

class IntegrationsContainer extends React.Component {
  static contextTypes = {
    account: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {
      withBridge: false,
      bridgeFetched: false,
      integrations: [
        {
          title: 'integrations.bridge.title',
          type: 'bridge',
          items: [
            {
              src: 'home/metrics/productbridge/error',
              label: 'integrations.bridge.items.0.0.label',
              responseCountLocation: 'totalProductError',
              link:
                '.vtexcommercestable.com.br/admin/bridge/#/marketplace/product?page=1&per_page=15&status=erro',
              value: 0,
            },
            {
              src: 'home/metrics/pricebridge/error',
              label: 'integrations.bridge.items.0.1.label',
              responseCountLocation: 'totalPriceError',
              link:
                '.vtexcommercestable.com.br/admin/bridge/#/marketplace/price?page=1&per_page=15&status=erro',
              value: 0,
            },
            {
              src: 'home/metrics/orderbridge/error',
              label: 'integrations.bridge.items.0.2.label',
              responseCountLocation: 'totalOrderError',
              link:
                '.vtexcommercestable.com.br/admin/bridge/#/marketplace/order?page=1&per_page=15&status=erro',
              value: 0,
            },
          ],
        },
        {
          title: 'integrations.payments.title',
          items: [
            {
              src: 'home/metrics/pendingorders',
              responseCountLocation: 'paging.total',
              label: 'integrations.bridge.items.1.0.label',
              link:
                '.vtexcommercestable.com.br/admin/checkout/#/orders?orderBy=creationDate,desc&page=1&f_status=payment-pending',
              value: 0,
            },
            {
              src: 'home/metrics/pendingorders/boletoexp',
              responseCountLocation: 'count',
              tooltipArrayLocation: 'list',
              tooltipLink:
                '.vtexcommercestable.com.br/admin/checkout/#/orders?orderBy=creationDate,desc&page=1',
              label: 'integrations.bridge.items.1.1.label',
              link:
                '.vtexcommercestable.com.br/admin/checkout/#/orders?orderBy=creationDate,desc&page=1&f_paymentNames=Boleto%20Banc%C3%A1rio&f_status=payment-pending',
              value: 0,
            },
          ],
        },
        {
          title: 'integrations.catalog.title',
          items: [
            {
              src: 'home/metrics/inactiveskulist/withstock',
              label: 'integrations.bridge.items.2.1.label',
              cta: 'integrations.bridge.items.2.1.cta',
              value: 0,
            },
            {
              src: 'home/metrics/productmostvisitednostock',
              tabs: {
                params: {
                  url: `${baseUrl}home/metrics/productmostvisitednostock`,
                  responseCountLocation: 'totalProductCount',
                  account,
                  // clientAutCookie,
                },
                items: [
                  {
                    urlParam: 0,
                    label: 'integrations.productmostvisitednostock.0',
                    type: 'today',
                  },
                  {
                    urlParam: 1,
                    label: 'integrations.productmostvisitednostock.1',
                    type: 'yesterday',
                  },
                  {
                    urlParam: 7,
                    label: 'integrations.productmostvisitednostock.7',
                    type: 'last7days',
                  },
                  {
                    urlParam: 14,
                    label: 'integrations.productmostvisitednostock.2',
                    type: 'last2weeks',
                  },
                  {
                    urlParam: 90,
                    label: 'integrations.productmostvisitednostock.3',
                    type: 'last3months',
                  },
                ],
              },
              responseCountLocation: 'totalProductCount',
              tooltipObjectLocation: {
                root: 'products',
                propertyLocation: 'id',
              },
              tooltipLink:
                '.vtexcommercestable.com.br/admin/Site/ProdutoForm.aspx?id=',
              label: 'integrations.bridge.items.2.0.label',
              link: '.vtexcommercestable.com.br/admin/Site/Produto.aspx',
              value: 0,
            },
          ],
        },
      ],
      chartIsLoading: false,
      pagePath: globalVars.chartTabs[0].type,
      timePeriod: 7,
    }
  }

  componentDidMount() {
    // this.fetchBridge()
    // this.fetchMetricPageload()
  }

  fetchBridge() {
    const url = endpoints.integrationsBridgeTest(account)

    axios({
      url,
      // headers: {
      //   VtexIdclientAutCookie: clientAutCookie,
      // },
    })
      .then(response => {
        const responseToBool = response.data.toLowerCase()

        this.setState(
          { withBridge: responseToBool, bridgeFetched: true },
          function() {
            this.setIntegrations()
          },
        )
      })
      .catch(error => {
        console.log('axios error on integrationsBridgeTest', error)
        this.setIntegrations()
      })
  }

  setIntegrations() {
    if (!this.state.withBridge) {
      const integrations = this.state.integrations
      // get rid of bridge's integrations
      integrations.shift()
      this.setState({ integrations }, function() {
        this.fetchIntegrations()
        return
      })
    }

    this.fetchIntegrations()
  }

  fetchIntegrations() {
    this.state.integrations.forEach(
      (integrationGroup, integrationGroupIndex) => {
        integrationGroup.items.forEach((el, itemIndex) => {
          let url = baseUrl + el.src
          if (el.tabs) {
            url += `/${el.tabs.items[0].urlParam}`
          }
          url += `/${account}`

          axios({
            url,
            // headers: {
            //   VtexIdclientAutCookie: clientAutCookie,
            // },
          })
            .then(response => {
              this.handleResponse(
                response.data,
                integrationGroupIndex,
                itemIndex,
              )
            })
            .catch(error => {
              console.log('axios fetch error integration ', el.src, error)
            })
        })
      },
    )
  }

  handleResponse(response, integrationGroupIndex, itemIndex) {
    const integrations = this.state.integrations
    const item = integrations[integrationGroupIndex].items[itemIndex]
    item.value = 0

    if (item.responseCountLocation) {
      item.value = item.responseCountLocation
        .split('.')
        .reduce((o, i) => o[i], response)
    } else if (Number.isInteger(response)) {
      item.value = response.toString()
    } else if (Array.isArray(response) && response.length > 0) {
      item.value = response.length
    } else if (typeof response === 'object' && response.count) {
      item.value = response.count.toString()
    }

    item.value = parseInt(item.value)

    if (item.tooltipObjectLocation) {
      const tooltipItems = []
      response[item.tooltipObjectLocation.root].forEach(obj => {
        tooltipItems.push(obj[item.tooltipObjectLocation.propertyLocation])
      })
      item.tooltip = tooltipItems
    }

    if (item.tooltipArrayLocation) {
      item.tooltip = response[item.tooltipArrayLocation]
    }

    item.tooltipLink =
      item.tooltipLink && 'https://' + account + item.tooltipLink

    item.loss = response.loss ? response.loss : 0
    item.currencyCode = response.currencyCode ? response.currencyCode : ''

    let extraparams = ''
    if (
      item.src === 'home/metrics/pendingorders/boletoexp' &&
      response.dateFrom &&
      response.dateTo
    ) {
      extraparams = '&f_creationDate=creationDate:%5B'
      extraparams += response.dateFrom
      extraparams += '%20TO%20'
      extraparams += response.dateTo
      extraparams += '%5D'
    }
    if (item.src === 'home/metrics/pendingorders/boletoexp') {
      item.tooltipLink += `${extraparams}&q=`
    }

    item.link = !isNil(item.link)
      ? 'https://' + account + item.link + extraparams
      : null

    this.setState({ integrations })
  }

  getI18nStr = id => this.props.intl.formatMessage({ id })

  handleTabChange = pagePath => {
    this.setState({ pagePath })
  }

  componentWillReceiveProps(nextProps) {
    const h = nextProps.homeData

    // YES ugly

    // group 1, Bridge
    if (h.errorMetric.totalProductError > 0) {
      const integrations = this.state.integrations
      integrations[0].items[0].value = h.errorMetric.totalProductError
      this.setState({ integrations })
    }
    if (h.errorMetric.totalPriceError > 0) {
      const integrations = this.state.integrations
      integrations[0].items[1].value = h.errorMetric.totalPriceError
      this.setState({ integrations })
    }
    if (h.errorMetric.totalOrderError > 0) {
      const integrations = this.state.integrations
      integrations[0].items[2].value = h.errorMetric.totalOrderError
      this.setState({ integrations })
    }

    // group 2 Payments
    if (h.pendingOrders.paging.total > 0) {
      const integrations = this.state.integrations
      integrations[1].items[0].value = h.pendingOrders.paging.total
      this.setState({ integrations })
    }
    if (h.pendingBankSlips.count > 0) {
      const integrations = this.state.integrations
      integrations[1].items[1].value = h.pendingBankSlips.count
      this.setState({ integrations })
    }

    // group 2 Catalog
    if (h.mostVisitedProductsNoStock.totalProductCount > 0) {
      const integrations = this.state.integrations
      integrations[2].items[1].value =
        h.mostVisitedProductsNoStock.totalProductCount
      this.setState({ integrations })
    }
  }

  render() {
    const { homeData, intl } = this.props
    const { pagePath, timePeriod, integrations } = this.state

    return (
      <section className="">
        <ColumnTitle title="integrations.title" />

        {integrations.map((integration, listIndex) => (
          <DataItemsList
            key={integration.title}
            listIndex={listIndex}
            title={integration.title}
            items={integration.items}
          />
        ))}

        <PageLoadWrapper
          pagePath={pagePath}
          timePeriod={timePeriod}
          handleChange={this.handleTabChange}
        />
      </section>
    )
  }
}

IntegrationsContainer.propTypes = {
  intl: intlShape,
}

export default compose(
  graphql(homeDataQuery, {
    name: 'homeData',
    options: { ssr: false, variables: { productsTimePeriod: 0 } },
  }),
  injectIntl,
)(IntegrationsContainer)
