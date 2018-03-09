import React, { Component } from 'react'

import Hello from './containers/Hello'
import FeedContainer from './containers/Feed'
import PlatformStatus from './containers/PlatformStatus'
import IntegrationsContainer from './containers/Integrations'

// eslint-disable-next-line
class Admin extends Component {
  componentDidMount() {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    return (
      <div className="ma5 mt8 flex flex-column flex-row-l">
        <div className="flex flex-column w-50-l w-100">
          <Hello username="Cristiano" />
          <IntegrationsContainer />
        </div>
        <div className="flex flex-column w-50-l w-100">
          <PlatformStatus
            lastCheck="2018-03-08T20:06:10"
            lastIncident="2018-03-01T20:06:10"
          />
          <FeedContainer />
        </div>
      </div>
    )
  }
}

export default Admin