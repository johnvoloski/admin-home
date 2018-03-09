import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import Card from '../components/Card'
import CardTitle from '../components/CardTitle'
import CardSubTitlte from '../components/CardSubTitlte'
import CardReadMore from '../components/CardReadMore'

class PlatformStatus extends React.Component {
  render() {
    const { intl, username, lastCheck, lastIncident } = this.props

    return (
      <Card className="mb6">
        <CardTitle>
          <div className="relative">
            {intl.formatMessage({ id: 'status.title' })}
            <span
              className="status-lastevrification absolute"
              style={{ right: 0 }}
            >
              <img
                src="https://image.ibb.co/jJKbQ7/Screen_Shot_2018_03_08_at_19_57_55.png"
                style={{ position: 'relative', top: '7px' }}
              />
              <span className="gray" style={{ fontSize: '14px' }}>
                {intl.formatRelative(lastCheck)}
              </span>
            </span>
          </div>
        </CardTitle>
        <CardSubTitlte>
          {intl.formatMessage({ id: 'status.subtitle' })}
        </CardSubTitlte>
        <p className="status-status f1 mt0 mb4 green fw6">
          <img
            className="mr4"
            src="https://image.ibb.co/e4sudS/Screen_Shot_2018_03_08_at_19_54_18.png"
            style={{ position: 'relative', top: '10px' }}
          />Everything is fine.
        </p>
        <p className="status-incident-latest dark-gray">
          <a href="#" className="dark-gray">
            {intl.formatMessage({ id: 'status.incident.last.link' })}
          </a>{' '}
          {intl.formatMessage(
            { id: 'status.incident.last.time' },
            { value: intl.formatRelative(lastIncident) },
          )}
        </p>
        <CardReadMore link="#" />
      </Card>
    )
  }
}

PlatformStatus.propTypes = {
  intl: intlShape,
  username: PropTypes.string,
  lastCheck: PropTypes.string,
  lastIncident: PropTypes.string,
}

export default injectIntl(PlatformStatus)
