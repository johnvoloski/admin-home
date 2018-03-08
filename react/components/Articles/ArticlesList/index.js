import React from 'react'
import PropTypes from 'prop-types'

import SectionTitle from '../../Titles/Section'
import { Article } from '../Article'
import { globalVars } from '../../../constants'
import * as endpoints from '../../../utils/endpoints'

const helpCenterBaseUrl = endpoints.helpCenterBaseUrl
const excerptLength = globalVars.feed.excerptLength

class ArticlesList extends React.Component {
  constructor(props) {
    super(props)

    this.buildUrl = this.buildUrl.bind(this)
    this.trimText = this.trimText.bind(this)

    this.state = {
      category: props.category,
    }
  }

  buildUrl(slug) {
    return helpCenterBaseUrl + this.state.category + '/' + slug
  }

  trimText(content) {
    if (!content) {
      return false
    }
    const trimmedStr = content.substr(0, excerptLength)
    return (
      trimmedStr.substr(
        0,
        Math.min(trimmedStr.length, trimmedStr.lastIndexOf(' '))
      ) + '…'
    )
  }

  render() {
    return (
      <section>
        <SectionTitle text={this.props.title} />

        <div className="nl3 nr3">
          {this.props.posts.map((post, index) => (
            <Article
              key={'post_' + index}
              link={post.link}
              title={post.title}
              excerpt={this.trimText(post.text)}
            />
          ))}
        </div>
      </section>
    )
  }
}

ArticlesList.propTypes = {
  title: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
}

export default ArticlesList
