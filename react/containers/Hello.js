import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class Hello extends React.Component {
  render() {
    const { intl, username } = this.props

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
            {intl.formatMessage({ id: 'hello-title' })}
          </span>
        </div>
        <div className="hello-subtitle f2 mid-gray fw1 tracked-tight">
          {intl.formatMessage({ id: 'hello-subtitle' })}{' '}
          <span className="hello-username fw5 dark-gray">{username}</span>.
        </div>
      </section>
    )
  }
}

Hello.propTypes = {
  intl: intlShape,
  username: PropTypes.string,
}

export default injectIntl(Hello)
