import React, { Component } from 'react'

import IntegrationsContainer from './containers/Integrations'
import FeedContainer from './containers/Feed'

// eslint-disable-next-line
export default class Admin extends Component {
  componentDidMount() {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    return (
      <div className="ma4 flex flex-column flex-row-l">
        <IntegrationsContainer />
        <FeedContainer />
      </div>
    )
  }
}
