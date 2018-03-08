import React from 'react'
import PropTypes from 'prop-types'

import ArticlesList from '../components/Articles/ArticlesList'

import axios from 'axios'

import { globalVars } from '../constants'
import * as endpoints from '../utils/endpoints'

// const url = window.location.host
let account = 'boticario'
// if (url.includes('localhost')) {
//   account = globalVars.anDefault
// } else {
//   account = url
//     .split('.')[0]
//     .split('--')
//     .pop()
// }

class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newsEntries: [],
      newsTitle: 'feed.news.title',
    }
  }

  componentDidMount() {
    // this.fetchDocuments()
  }

  fetchDocuments() {
    axios(endpoints.feedCrmFetchUrl(account)).then(response => {
      this.setState({
        newsEntries: this.setEntriesFromCRM(response.data.Documents),
      })
    })
  }

  // setEntries(data) {
  //   const entries = []
  //   data.items.forEach(item => {
  //     entries.push(item.fields)
  //   })
  //   return entries
  // }

  setEntriesFromCRM(data) {
    const entries = []
    data.forEach(item => {
      const factoredItem = {
        title: item.Titulo,
        link: item.Link,
        text: item.Descricao,
      }
      entries.push(factoredItem)
    })
    return entries
  }

  render() {
    return (
      <ArticlesList
        posts={this.state.newsEntries}
        title={this.state.newsTitle}
        category={this.props.contentType}
      />
    )
  }
}

ArticlesContainer.propTypes = {
  postsWanted: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
}

export default ArticlesContainer
