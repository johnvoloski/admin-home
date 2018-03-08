import React, { Component } from 'react'
import {graphql} from 'react-apollo'

import homeDataQuery from './queries/home.graphql'
import IntegrationsContainer from './containers/Integrations'
import FeedContainer from './containers/Feed'

// eslint-disable-next-line
class Admin extends Component {
  componentDidMount() {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    const { data } = this.props

    return (
      <div className="ma4 flex flex-column flex-row-l">
        <IntegrationsContainer />
        <FeedContainer />
      </div>
    )
  }
}

export default graphql(homeDataQuery, {
  options: { ssr: false, variables: {productsTimePeriod: 0, pagePath: 'home', loadTimePeriod: 1} },
})(Admin)