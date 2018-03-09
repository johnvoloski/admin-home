import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { intlShape, injectIntl } from 'react-intl'

import homeDataQuery from '../queries/home.graphql'

import DataItemsList from '../components/DataItems/DataItemsList'
import PageLoadWrapper from '../components/PageLoadWrapper'
import DataItem from '../components/DataItems/DataItem'
import Performance from './Performance'
import Card from '../components/Card'
import CardTitle from '../components/CardTitle'
import CardSubTitlte from '../components/CardSubTitlte'

import { globalVars } from '../constants'
import * as endpoints from '../utils/endpoints'

import axios from 'axios'
import moment from 'moment'
import { isNil } from 'ramda'

const baseUrl = endpoints.smartlinkBaseUrl

class IntegrationsContainer extends React.Component {
  static contextTypes = {
    account: PropTypes.string,
  }

  constructor(props, context) {
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
                  account: context.account,
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
      pagePath: globalVars.chartTabs[0].type,
      timePeriod: 7,
    }
  }

  handleTabChange = (pagePath, timePeriod) => {
    this.setState({ pagePath, timePeriod })
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
    // if (h.mostVisitedProductsNoStock.totalProductCount > 0) {
    //   const integrations = this.state.integrations
    //   integrations[2].items[1].value =
    //     h.mostVisitedProductsNoStock.totalProductCount
    //   this.setState({ integrations })
    // }
  }

  render() {
    const { homeData, intl } = this.props
    const { pagePath, timePeriod, integrations } = this.state

    return (
      <section className="integrations-container">
        <Card className="mb8">
          <CardTitle>
            {intl.formatMessage({ id: 'integrations.actions.title' })}
          </CardTitle>
          <CardSubTitlte>
            {intl.formatMessage({ id: 'integrations.actions.subTitle' })}
          </CardSubTitlte>

          {integrations.map((integration, listIndex) => (
            <DataItemsList
              key={integration.title}
              listIndex={listIndex}
              title={integration.title}
              items={integration.items}
            />
          ))}
        </Card>

        <Card>
          <CardTitle>
            {intl.formatMessage({ id: 'metric.pageload.title' })}
          </CardTitle>
          <CardSubTitlte>
            {intl.formatMessage({ id: 'metric.pageload.description' })}
          </CardSubTitlte>
          <PageLoadWrapper
            pagePath={pagePath}
            timePeriod={timePeriod}
            tabClick={this.handleTabChange}
          />
        </Card>
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
