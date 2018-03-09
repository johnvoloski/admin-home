import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'react-apollo'
import { FormattedMessage } from 'react-intl'

import profileDataQuery from '../queries/profileData.graphql'

class Hello extends React.Component {
  render() {
    const { data: { topbarData } } = this.props
    const name = topbarData ? topbarData.profile.name : ''

    return (
      <section
        className="hello-container w-50"
        style={{
          marginTop: '3rem',
          marginLeft: '6rem',
          marginBottom: '6rem',
        }}
      >
        <div className="hello-title mb6">
          <img
            className="hello-title-icon"
            style={{ position: 'relative', top: '8px', left: '-10px' }}
            src="https://image.ibb.co/d7ZXyS/Screen_Shot_2018_03_08_at_19_22_26.png"
          />
          <span className="hello-title-text" style={{ fontSize: '4rem' }}>
            <FormattedMessage id="hello-title" />
          </span>
        </div>
        <div className="hello-subtitle f2 mid-gray fw1 tracked-tight">
          <FormattedMessage id="hello-subtitle" />{' '}
          <span className="hello-username fw5 dark-gray">{name}</span>.
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
