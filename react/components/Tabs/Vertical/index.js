import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'
import { Tab, LeftTabs } from 'pui-react-tabs'

import SectionTitle from '../../Titles/Section'
import SectionSubTitle from '../../Titles/Section/SectionSubTitle'

import * as endpoints from '../../../utils/endpoints'

const helpCenterBaseUrl = endpoints.helpCenterBaseUrl

class VerticalTabs extends React.Component {
  constructor(props) {
    super(props)

    this.buildUrl = this.buildUrl.bind(this)

    this.state = {
      type: props.type,
    }
  }

  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  buildUrl = slug => helpCenterBaseUrl + this.state.type + '/' + slug

  render() {
    const classes = []

    this.props.tabs.forEach((tab, i) => {
      classes[i] = { class: '', id: '' }
      classes[i].id = '#' + tab.icon
    })

    return (
      <div className="vertical-tabs cf">
        <SectionTitle text={this.props.title} link={helpCenterBaseUrl} />
        <SectionSubTitle text="feed.subTitle" />

        <LeftTabs defaultActiveKey={0} tabWidth={8} paneWidth={16}>
          {this.props.tabs.map((tab, index) => (
            <Tab
              eventKey={index}
              key={'tab_' + index}
              title={
                <div
                  role="button"
                  tabIndex={index}
                  className="cf dib w-100 v-mid"
                  onKeyPress={() => {
                    this.props.checkEntries(index)
                  }}
                  onClick={() => {
                    this.props.checkEntries(index)
                  }}
                >
                  <span className="v-mid fl db pv2 fw4 fw5-ns f6 font-body">
                    {this.getI18nStr(tab.title)}
                  </span>
                  <svg className="v-mid fr dn db-l w-30px h-30px">
                    <use xlinkHref={classes[index].id} />
                  </svg>
                </div>
              }
              tabClassName={tab.icon}
            >
              {tab.content.map((content, index) => (
                <p key={'tab-content_' + index} className="mb4">
                  <a
                    className="f5 fw4 font-body lh-copy mid-gray hover-dark-gray"
                    target="_blank"
                    href={this.buildUrl(content.slug)}
                  >
                    {content.title}
                  </a>
                </p>
              ))}
            </Tab>
          ))}
        </LeftTabs>
      </div>
    )
  }
}

VerticalTabs.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tabs: PropTypes.array.isRequired,
  checkEntries: PropTypes.func.isRequired,
  intl: intlShape,
}

export default injectIntl(VerticalTabs)
