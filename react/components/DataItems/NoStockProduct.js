import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import { injectIntl } from 'react-intl'

import mostVisitedProductsNoStock from '../../queries/noStock.graphql'

import DataItem from './DataItem/'

class NoStockProduct extends Component {
  getI18nStr = id => this.props.intl.formatMessage({ id })

  constructor(props) {
    super(props)
    this.state = {
      title: 'integrations.catalog.title',
      item: {
        src: 'home/metrics/productmostvisitednostock',
        tabs: {
          items: [
            {
              label: 'integrations.productmostvisitednostock.0',
              type: 'today',
            },
            {
              label: 'integrations.productmostvisitednostock.1',
              type: 'yesterday',
            },
            {
              label: 'integrations.productmostvisitednostock.7',
              type: 'last7days',
            },
            {
              label: 'integrations.productmostvisitednostock.2',
              type: 'last2weeks',
            },
            {
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
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: { mostVisitedProductsNoStock, loading } } = nextProps
    // group 2 Catalog
    if (!loading && mostVisitedProductsNoStock.totalProductCount >= 0) {
      const item = this.state.item
      item.value = mostVisitedProductsNoStock.totalProductCount
      this.setState({ item })
    }
  }

  render() {
    const { listIndex } = this.props
    const { item: { value, label, link, tooltipLink, tabs } } = this.state
    return (
      <DataItem
        key={listIndex + '+dataItem'}
        value={value}
        label={label}
        link={link}
        tooltipLink={tooltipLink}
        tabs={tabs}
      />
    )
  }
}

NoStockProduct.propTypes = {
  timePeriod: PropTypes.number.isRequired,
  listIndex: PropTypes.number.isRequired,
}

export default compose(
  graphql(mostVisitedProductsNoStock, {
    options: ({ timePeriod }) => ({
      ssr: false,
      variables: { timePeriod },
    }),
  }),
  injectIntl,
)(NoStockProduct)
