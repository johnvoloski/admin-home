import React from 'react'
import { injectIntl, intlShape } from 'react-intl'

import Card from '../components/Card'
import CardTitle from '../components/CardTitle'
import CardReadMore from '../components/CardReadMore'

class Today extends React.Component {
  render() {
    const { intl } = this.props

    return (
      <Card className="mb8">
        <CardTitle>{intl.formatMessage({ id: 'today.title' })}</CardTitle>
        <img src="https://image.ibb.co/nirgsn/Screen_Shot_2018_03_09_at_16_16_18.png" />
        <CardReadMore link="http://insights.vtex.com/" />
      </Card>
    )
  }
}

Today.propTypes = {
  intl: intlShape,
}

export default injectIntl(Today)
