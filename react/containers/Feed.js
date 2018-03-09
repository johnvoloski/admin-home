import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import { graphql, compose } from 'react-apollo'

import Card from '../components/Card'
import CardTitle from '../components/CardTitle'
import CardSubTitlte from '../components/CardSubTitlte'
import CardReadMore from '../components/CardReadMore'
import Article from '../components/Articles/Article'
import Announcement from '../components/Announcement'

import feedQuery from '../queries/feed.graphql'

class FeedContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    intl: intlShape,
  }

  render() {
    const { intl, data: {loading, helpEntries, blogEntries} } = this.props
    if (loading) {
      return null
    }

    return (
      <section className="serious-black pv6">
        <Card className="mb8">
          <CardTitle>
            {intl.formatMessage({ id: 'announcements.title' })}
          </CardTitle>
          <CardSubTitlte>
            {intl.formatMessage({ id: 'announcements.subtitle' })}
          </CardSubTitlte>
          {helpEntries.map((e, i) => (
            <Announcement
              key={i}
              title={e.title}
              date={e.createdAt}
              link={`https://help.vtex.com/${e.locale}/announcement/${e.slug}`}
              image={e.image}
              content={e.synopsis}
              />
          ))}
          <CardReadMore link="https://help.vtex.com/pt/announcements" />
        </Card>

        <Card>
          <CardTitle>{intl.formatMessage({ id: 'news.title' })}</CardTitle>
          <CardSubTitlte>
            {intl.formatMessage({ id: 'news.subtitle' })}
          </CardSubTitlte>
          {blogEntries.map((e, i) => (
            <Article key={i}
              title={e.title}
              date={e.createdAt}
              content={e.intro}
              link={`https://blog.vtex.com/${e.uri}`}
            />
          ))}
          <CardReadMore link="https://blog.vtex.com/" />
        </Card>
      </section>
    )
  }
}

export default compose(
  graphql(feedQuery, {
    options: {
      ssr: false,
    },
  }),
  injectIntl,
)(FeedContainer)
