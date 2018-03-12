import React, { Component } from 'react'

import Hello from './containers/Hello'
import Feed from './containers/Feed'
// import Today from './containers/Today'
import PlatformStatus from './containers/PlatformStatus'
import IntegrationsContainer from './containers/Integrations'
import RedBlock from './containers/RedBlock'
import MetricCard from './components/MetricCard'

// eslint-disable-next-line
class Admin extends Component {
  componentDidMount() {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    return (
      <div className="pr5 pl5 pt8 pb8" style={{ backgroundColor: '#fafafa' }}>
        <div
          className=" relative flex flex-column flex-row-l justify-around"
          style={{ zIndex: 1 }}
        >
          <div className="flex flex-column w-40-l w-100">
            <Hello />
            <MetricCard />
            <IntegrationsContainer />
          </div>
          <div className="flex flex-column w-40-l w-100 mt8">
            <PlatformStatus />
            <Feed />
          </div>
        </div>
        <RedBlock />
      </div>
    )
  }
}

export default Admin
