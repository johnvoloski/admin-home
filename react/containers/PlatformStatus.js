import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql, compose } from 'react-apollo'

import Card from '../components/Card'
import CardTitle from '../components/CardTitle'
import CardSubTitlte from '../components/CardSubTitlte'
import CardReadMore from '../components/CardReadMore'

import healthcheckQuery from '../queries/healthcheck.graphql'

class PlatformStatus extends Component {
  constructor() {
    super()
    this.state = {
      hasNoErrors: true,
      modulesWithErrors: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: {vtexStatus, loading} } = nextProps
    if (!loading) {
      this.processData(vtexStatus)
    }
  }

  processData = (vtexStatus) => {
    let hasNoErrors = true
    const modulesWithErrors = []
    vtexStatus.forEach(component => {
      if (component.status !== 'operational') {
        hasNoErrors = false
        modulesWithErrors.push(component.name)
      }
    })
    if (!hasNoErrors) {
      this.setState({ hasNoErrors: false, modulesWithErrors })
    }
  }

  render() {
    const { intl, lastCheck, lastIncident } = this.props
    const { modulesWithErrors, hasNoErrors } = this.state

    return (
      <Card className="mb6">
        <CardTitle>
          <div className="flex space-between">
            <div className="w-70">
              {intl.formatMessage({ id: 'status.title' })}
            </div>
            <div
              className="status-lastevrification w-30 tr"
              style={{ right: 0 }}
            >
              <img
                src="https://image.ibb.co/jJKbQ7/Screen_Shot_2018_03_08_at_19_57_55.png"
                style={{ position: 'relative', top: '7px' }}
              />
              <span className="gray" style={{ fontSize: '14px' }}>
                {intl.formatRelative(lastCheck)}
              </span>
            </div>
          </div>
        </CardTitle>
        <CardSubTitlte>
          {intl.formatMessage({ id: 'status.subtitle' })}
        </CardSubTitlte>
        <div className="status-status mb4">
          {hasNoErrors ? (
            <div>
              <img
                className="mr4"
                src="https://image.ibb.co/e4sudS/Screen_Shot_2018_03_08_at_19_54_18.png"
                style={{ position: 'relative', top: '10px' }}
              />
              <span className="status-status-label f1 fw6 green">
                {intl.formatMessage({ id: 'status.situation.ok' })}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="mr4"
                src="https://image.ibb.co/gjoDNn/Screen_Shot_2018_03_09_at_15_03_33.png"
                style={{
                  position: 'relative',
                  top: '10px',
                  maxWidth: '60px',
                  height: 'auto',
                }}
              />
              <span className="status-status-label f1 fw6 yellow">
                {intl.formatMessage({ id: 'status.situation.error' })}
              </span>
              {modulesWithErrors.length > 0 && (
                <p>
                  {intl.formatMessage({
                    id: 'status.situation.affectedmodules',
                  })}{' '}
                  {modulesWithErrors.map((m, i) => (
                    <span key={`module_${m}`} className="b">
                      {m}
                      {modulesWithErrors.length > 0 &&
                        i < modulesWithErrors.length - 1 &&
                        ', '}
                      {i === modulesWithErrors.length - 1 && '.'}
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>

        <p className="status-incident-latest dark-gray">
          <a href="#" className="dark-gray">
            {intl.formatMessage({ id: 'status.incident.last.link' })}
          </a>{' '}
          {intl.formatMessage(
            { id: 'status.incident.last.time' },
            { value: intl.formatRelative(lastIncident) },
          )}
        </p>
        <CardReadMore link="http://status.vtex.com/" />
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

export default compose(
  graphql(healthcheckQuery),
  injectIntl
)(PlatformStatus)
