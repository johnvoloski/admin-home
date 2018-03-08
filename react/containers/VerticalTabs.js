import React from 'react'
import { createClient } from 'contentful'
import VerticalTabs from '../components/Tabs/Vertical'
import { globalVars } from '../constants'

// const cookie = require('cookie-dough')()

const client = createClient({
  space: globalVars.client.spaceID,
  accessToken: globalVars.client.accessToken,
})

const entriesQty = globalVars.verticalTabs.entriesQty
const selectedContentType = globalVars.verticalTabs.selectedContentType
const selectedCats = globalVars.verticalTabs.selectedCats

class VerticalTabsContainer extends React.Component {
  constructor() {
    super()
    this.checkEntries = this.checkEntries.bind(this)
    this.state = {
      title: 'feed.help.title',
      tabsContent: [
        {
          title: 'feed.help.tabs.0.title',
          icon: 'uim-icon-product',
          content: [],
        },
        {
          title: 'feed.help.tabs.1.title',
          icon: 'uim-icon-store',
          content: [],
        },
        {
          title: 'feed.help.tabs.2.title',
          icon: 'uim-icon-card',
          content: [],
        },
        {
          title: 'feed.help.tabs.3.title',
          icon: 'uim-icon-bag',
          content: [],
        },
        {
          title: 'feed.help.tabs.4.title',
          icon: 'uim-icon-plug',
          content: [],
        },
        {
          title: 'feed.help.tabs.5.title',
          icon: 'uim-icon-themes',
          content: [],
        },
      ],
    }
  }

  handleChange(arr, index) {
    const items = this.state.tabsContent
    items[index].content = arr

    this.setState({
      tabsContent: items,
    })
  }

  setEntries(data, index) {
    const arr = []
    data.forEach(item => {
      const obj = {
        slug: item.fields.slug,
        title: item.fields.title,
      }
      arr.push(obj)
    })
    this.handleChange(arr, index)
  }

  fetchEntries(contentType, category, entriesQty, index) {
    client
      .getEntries({
        content_type: contentType,
        limit: entriesQty,
        locale: 'en', //cookie.get('contentFulHomeLocale'),
        'fields.category.sys.id': category,
      })
      .then(response => this.setEntries(response.items, index))
      .catch(console.error)
  }

  setCategoriesIds(response) {
    response.forEach(item => {
      selectedCats.forEach((cat, index) => {
        if (item.fields.slug === cat.slug) {
          selectedCats[index].id = item.sys.id
        }
      })
    })
  }

  fetchCategories() {
    client
      .getEntries({ content_type: 'category' })
      .then(response => {
        this.setCategoriesIds(response.items)
        this.checkEntries(0)
      })
      .catch(console.error)
  }

  checkEntries(num) {
    if (this.state.tabsContent[num].content.length === 0) {
      this.fetchEntries(
        selectedContentType,
        selectedCats[num].id,
        entriesQty,
        num,
      )
    }
  }

  componentDidMount() {
    this.fetchCategories()
  }

  render() {
    return (
      <VerticalTabs
        type={selectedContentType}
        tabs={this.state.tabsContent}
        title={this.state.title}
        checkEntries={this.checkEntries}
      />
    )
  }
}

export default VerticalTabsContainer
