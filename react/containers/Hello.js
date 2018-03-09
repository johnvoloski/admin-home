import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'
import { getGreetingTime } from '../utils'

import profileDataQuery from '../queries/profileData.graphql'

class Hello extends React.Component {
  render() {
    const { data: { topbarData } } = this.props
    const [firstName] = topbarData.profile.name.split(' ')

    return (
      <section
        className="hello-container white"
        style={{
          marginBottom: '3rem',
        }}
      >
        <div className="hello-title mb6">
          {/* <img
            className="hello-title-icon"
            style={{ position: 'relative', top: '8px', left: '-10px' }}
            src="https://image.ibb.co/d7ZXyS/Screen_Shot_2018_03_08_at_19_22_26.png"
          /> */}
          <span className="pr4">
            <svg xmlns='http://www.w3.org/2000/svg' width='64' height='42' viewBox='0 0 64 64'>
              <g className='nc-icon-wrapper' fill='none' transform='translate(.5 .5)'
                stroke='#000' strokeWidth='3' strokeLinecap='round' strokeMiterlimit='10'
                strokeLinejoin='round'>
                <line x1='54' y1='13' x2='10' y2='13' />
                <rect x='17' y='38' width='10' height='10' />
                <polyline points='8,36 8,61 36,61 36,43 48,43 48,61 56,61 56,36' />
                <path d='M54,13V3H10v10L2,23 c0,3.866,3.134,7,7,7c2.234,0,4.218-1.05,5.5-2.679C15.782,28.95,17.766,30,20,30c2.551,0,4.777-1.369,6-3.408 C27.223,28.631,29.449,30,32,30s4.777-1.369,6-3.408C39.223,28.631,41.449,30,44,30c2.234,0,4.218-1.05,5.5-2.679 C50.782,28.95,52.766,30,55,30c3.866,0,7-3.134,7-7L54,13z'
                />
                <polyline points="8,36 8,61 36,61 36,43 48,43 48,61 56,61 56,36" />
                <path d="M54,13V3H10v10L2,23 c0,3.866,3.134,7,7,7c2.234,0,4.218-1.05,5.5-2.679C15.782,28.95,17.766,30,20,30c2.551,0,4.777-1.369,6-3.408 C27.223,28.631,29.449,30,32,30s4.777-1.369,6-3.408C39.223,28.631,41.449,30,44,30c2.234,0,4.218-1.05,5.5-2.679 C50.782,28.95,52.766,30,55,30c3.866,0,7-3.134,7-7L54,13z" />
              </g>
            </svg>
          </span>
          <span className="hello-title-text" style={{ fontSize: '4rem' }}>
            <FormattedMessage id="hello-title" />
          </span>
        </div>
        <div className="hello-subtitle f3 mid-gray fw1 tracked-tight">
          <FormattedMessage id={`hello-subtitle-${getGreetingTime()}`} />{' '}
          <span className="hello-username fw5 dark-gray">{firstName}</span>.
        </div>
      </section>
    )
  }
}

Hello.propTypes = {
  data: PropTypes.object,
}

export default graphql(profileDataQuery, {
  options: {
    ssr: false,
  },
})(Hello)
