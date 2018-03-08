import React from 'react'

import ColumnTitle from '../components/Titles/Column'
// import ArticlesContainer from './Articles'
import Announcement from '../components/Announcement'

// import EventListener from 'react-event-listener'

import {
  isParentWindowTopbarLocale,
  isParentWindowRuntimeLocale,
} from '../utils'
import { globalVars } from '../constants'

class FeedContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      displayNews: false,
    }
  }

  componentDidMount() {
    // this.handledisplayNews()
  }

  // handledisplayNews = () => {
  //   if (
  //     isParentWindowTopbarLocale() &&
  //     parent.window.vtex.topbar.service.Locale.getLocale() === 'pt-BR'
  //   ) {
  //     this.setState({ displayNews: true })
  //   } else if (
  //     isParentWindowRuntimeLocale() &&
  //     parent.window.__RUNTIME__.culture.locale === 'pt-BR'
  //   ) {
  //     this.setState({ displayNews: true })
  //   } else {
  //     this.setState({ displayNews: false })
  //   }
  // }

  render() {
    const announcements = [
      { title: 'title 1', content: 'kjhvf sjdfh sd' },
      { title: 'title 2', content: 'adf sdfjhfdsv jfvghjs dvf' },
    ]

    return (
      <section className="w-100 w-50-l ph3-ns vtex-seriousblack">
        <ColumnTitle title="feed.title" />

        <h2>Announcements</h2>

        <h2>News</h2>

        {/* {announcements.map(a => (
          <Announcement key={a.title} title={a.title} content={a.content} />
        ))} */}

        {/* <EventListener target="window" handleMessage={this.handledisplayNews} /> */}

        {/* {this.state.displayNews && ( */}
        {/* <ArticlesContainer
          postsWanted={globalVars.feed.postsWanted}
          contentType={globalVars.feed.feedType}
        /> */}
      </section>
    )
  }
}

export default FeedContainer
