import React, { Component } from 'react'

import Hello from './containers/Hello'
import FeedContainer from './containers/Feed'
import Today from './containers/Today'
import PlatformStatus from './containers/PlatformStatus'
import IntegrationsContainer from './containers/Integrations'

// eslint-disable-next-line
class Admin extends Component {
  componentDidMount() {
    window.postMessage({ action: { type: 'STOP_LOADING' } }, '*')
  }

  render() {
    return (
      <div className="pa5 pt8 flex flex-column flex-row-l justify-around" style={{ backgroundColor: '#fafafa'}}>
        <div>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='-19635.025 4628 1848.025 711.845'>
            <defs>
              <g id='pink_bar' transform='translate(-19707 4562)'>
                <path id='Path_588' className='cls-1' d='M0,0H1848.025V414.286L0,711.844Z'
                  transform='translate(71.975 66)' />
              </g>
            </defs>
          </svg>
        </div>
        <div className="flex flex-column w-40-l w-100">
          <Hello />
          <Today />
          <IntegrationsContainer />
        </div>
        <div className="flex flex-column w-40-l w-100 mt8">
          <PlatformStatus
            lastCheck="2018-03-08T20:06:10"
          />
          <FeedContainer />
        </div>
      </div>
    )
  }
}

export default Admin
