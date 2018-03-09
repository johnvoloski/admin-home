import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { intlShape, injectIntl } from 'react-intl'

import homeDataQuery from '../queries/home.graphql'

import DataItemsList from '../components/DataItems/DataItemsList'
import NoStockProduct from '../components/DataItems/NoStockProduct'
import PageLoadWrapper from '../components/PageLoadWrapper'
import Performance from './Performance'
import Card from '../components/Card'
import CardTitle from '../components/CardTitle'
import CardSubTitlte from '../components/CardSubTitlte'

import { globalVars } from '../constants'

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
              label: 'integrations.bridge.items.0.0.label',
              responseCountLocation: 'totalProductError',
              link:
                '.vtexcommercestable.com.br/admin/bridge/#/marketplace/product?page=1&per_page=15&status=erro',
              value: 0,
            },
            {
              label: 'integrations.bridge.items.0.1.label',
              responseCountLocation: 'totalPriceError',
              link:
                '.vtexcommercestable.com.br/admin/bridge/#/marketplace/price?page=1&per_page=15&status=erro',
              value: 0,
            },
            {
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
              responseCountLocation: 'paging.total',
              label: 'integrations.bridge.items.1.0.label',
              link:
                '.vtexcommercestable.com.br/admin/checkout/#/orders?orderBy=creationDate,desc&page=1&f_status=payment-pending',
              value: 0,
            },
            {
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
      ],
      pagePath: globalVars.chartTabs[0].type,
      pageLoadTimePeriod: 7,
      dataItemTimePeriod: 0,
      dataItemTab: 'today',
    }
  }

  handlePageLoadTabChange = (pagePath, timePeriod) => {
    this.setState({ pagePath, pageLoadTimePeriod: timePeriod })
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
  }

  handleDataItemTabClick = (timePeriod, tab) => {
    this.setState({dataItemTimePeriod: timePeriod, dataItemTab: tab})
  }

  render() {
    const { homeData, intl } = this.props
    const { pagePath, pageLoadTimePeriod, dataItemTimePeriod, dataItemTab, integrations } = this.state

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
          <NoStockProduct
            timePeriod={dataItemTimePeriod}
            listIndex={1}
            handleTabClick={this.handleDataItemTabClick}
            activeTab={dataItemTab}
          />
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
            timePeriod={pageLoadTimePeriod}
            tabClick={this.handlePageLoadTabChange}
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
