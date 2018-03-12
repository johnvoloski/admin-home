import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { injectIntl } from 'react-intl'

import metricsQuery from '../queries/metrics.graphql'

class MetricCard extends Component {
  getI18nStr = id => this.props.intl.formatMessage({ id })
  constructor(props) {
    super(props)
    this.state = {
      ordersPlaced: undefined,
      sessions: undefined,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: { ordersPlaced, sessions, loading } } = nextProps

    if (!loading) {
      this.setState({ordersPlaced: ordersPlaced[0].count, sessions: sessions[0].count})
    }
  }

  render() {
    const { ordersPlaced, sessions } = this.state
    return (
      <div>
        <h3 className="mt4 mb0 f4 lh-copy font-display">
          {this.getI18nStr('metric.orders')}
        </h3>
        {ordersPlaced}
        <h3 className="mt4 mb0 f4 lh-copy font-display">
          {this.getI18nStr('metric.sessions')}
        </h3>
        {sessions}
      </div>
    )
  }
}

export default compose(
  graphql(metricsQuery, {
    options: {
      variables: { from: 'now-1d', to: 'now' },
    },
  }),
  injectIntl,
)(MetricCard)
