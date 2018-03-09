import React from 'react'
import { injectIntl, intlShape } from 'react-intl'

import Card from '../components/Card'
import CardTitle from '../components/CardTitle'
import CardSubTitlte from '../components/CardSubTitlte'
import CardReadMore from '../components/CardReadMore'
import Article from '../components/Articles/Article'
import Announcement from '../components/Announcement'

class FeedContainer extends React.Component {
  render() {
    const { intl } = this.props

    const announcements = [
      {
        title: 'Requisições com paginação na API de busca vão mudar',
        date: '03/07/2018',
        link: '#',
        image:
          'https://image.ibb.co/bUWgQ7/Screen_Shot_2018_03_08_at_19_09_03.png',
        content:
          'A partir de 31 de março, as requisições com paginação na API de busca não vão mais poder ser feitas com o header resources do request.',
      },
      {
        title: 'Novo Admin já está sendo liberado para todas as lojas',
        date: '03/01/2018',
        link: '#',
        image: 'https://image.ibb.co/nDG4dS/icon.png',
        content:
          'Depois de passar um tempo em beta, podendo ser testado por uma parte dos nossos clientes, o novo Admin foi melhorado e vai começar a ser liberado.',
      },
    ]

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
          {announcements.map((a, i) => (
            <Announcement key={`${a.title}_${i}`} {...a} />
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

FeedContainer.propTypes = {
  intl: intlShape,
}

export default injectIntl(FeedContainer)
