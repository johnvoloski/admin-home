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
    console.log(helpEntries, blogEntries)

    const articles = [
      {
        title:
          'Workshop Neuromarketing - Neurociência do Comportamento do Consumidor na Prática!',
        date: '02/23/2018',
        content:
          'Nos dias 3 e 4 de Outubro participe do Workshop Neuromarketing - Neurociência do Comportamento do Consumidor na Prática!  Para os clientes e…',
        link: '#',
      },
      {
        title: 'Evento Black Friday',
        date: '02/06/2018',
        content:
          'A VTEX vai promover um evento com o objetivo de capacitar nossas agências e clientes para a maior data do varejo brasileiro: BLACK FRIDAY! O evento…',
        link: '#',
      },
      {
        title:
          'Workshop Neuromarketing - Neurociência do Comportamento do Consumidor na Prática!',
        date: '01/29/2018',
        content:
          'Nos dias 3 e 4 de Outubro participe do Workshop Neuromarketing - Neurociência do Comportamento do Consumidor na Prática!  Para os clientes e…',
        link: '#',
      },
      {
        title: 'Evento Black Friday',
        date: '12/29/2017',
        content:
          'A VTEX vai promover um evento com o objetivo de capacitar nossas agências e clientes para a maior data do varejo brasileiro: BLACK FRIDAY! O evento…',
        link: '#',
      },
    ]

    return (
      <section className="serious-black pv6">
        <Card className="mb8">
          <CardTitle>
            {intl.formatMessage({ id: 'announcements.title' })}
          </CardTitle>
          <CardSubTitlte>
            {intl.formatMessage({ id: 'announcements.subtitle' })}
          </CardSubTitlte>
          {helpEntries.map((a, i) => (
            <Announcement
              key={i}
              title={a.title}
              date={a.createdAt}
              link={`https://help.vtex.com/${a.locale}/announcement/${a.slug}`}
              image={a.image}
              content={a.synopsis}
              />
          ))}
          <CardReadMore link="https://help.vtex.com/pt/announcements" />
        </Card>

        <Card>
          <CardTitle>{intl.formatMessage({ id: 'news.title' })}</CardTitle>
          <CardSubTitlte>
            {intl.formatMessage({ id: 'news.subtitle' })}
          </CardSubTitlte>
          {articles.map((a, i) => <Article key={`${a.title}_${i}`} {...a} />)}
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
