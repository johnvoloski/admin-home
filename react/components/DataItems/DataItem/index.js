import React from 'react'
import PropTypes from 'prop-types'
import AnimatedNumber from 'react-animated-number'
import ReactTooltip from 'react-tooltip'
import ChartTab from '../../Metrics/ChartTab'
import Loader from '../../Loader'
import { injectIntl, intlShape } from 'react-intl'
import { isNil, find, propEq } from 'ramda'
import axios from 'axios'

class DataItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isTabsLoading: false,
      activeTab: props.tabs ? props.tabs.items[0].type : null,
    }
  }

  getI18nStr = (id, values) => this.props.intl.formatMessage({ id }, values)

  isNotNan = value => !isNaN(value)

  tabClick = type => {
    if (this.props.tabs) {
      this.setState({ isTabsLoading: true })
      const params = this.props.tabs.params

      const item = find(propEq('type', type))(this.props.tabs.items)
      const url = `${params.url}/${item.urlParam}/${params.account}`

      axios({
        url,
        headers: {
          VtexIdclientAutCookie: params.clientAutCookie,
        },
      })
        .then(response => {
          const tooltipItems = []
          response.data.products.forEach(obj => tooltipItems.push(obj.id))

          this.setState({
            isTabsLoading: false,
            updatedValue: response.data[params.responseCountLocation],
            updatedTooltipItems: tooltipItems,
            activeTab: item.type,
          })
        })
        .catch(() => {
          this.setState({ isTabsLoading: false })
        })
    }
  }

  render() {
    const {
      loss,
      cta,
      link,
      tooltipLink,
      label,
      currencyCode,
      tabs,
    } = this.props

    const value = this.state.updatedValue || this.props.value
    const tooltipItems =
      this.state.updatedTooltipItems || this.props.tooltipItems

    const cardValue = this.state.isTabsLoading ? (
      <Loader breakAfter />
    ) : (
      <AnimatedNumber
        className={
          'w-100 fw9 ma0 serious-black font-display data-item-value dib f1-l f2-m f3 ' +
          (link && ' hover-clean-blue')
        }
        value={value}
        duration={800}
        stepPrecision={0}
      />
    )

    const cardLabel = (
      <span className="mt3 mt1-ns mh0 mb0 black-70 font-body lh-copy fw5 f5">
        {this.getI18nStr(label)}
      </span>
    )

    const cleanCurrencyCode = currencyCode === 'R$' ? 'BRL' : currencyCode
    const cardLoss = loss > 0 && (
      <span className="f6 db fw4 rebel-pink font-body lh-copy">
        {this.getI18nStr('integrations.bridge.items.1.1.current-opportunity', {
          value: this.props.intl.formatNumber(loss, {
            style: 'currency',
            currency: cleanCurrencyCode,
          }),
        })}
      </span>
    )

    const cardCTA =
      cta && value !== 0 ? (
        <span className="mt1 db f6 dark-green font-body lh-copy">
          {this.getI18nStr(cta)}
        </span>
      ) : null

    const tooltipItemsMaxLength = 10

    return (
      this.isNotNan(parseInt(value)) &&
      value !== 0 && (
        <div className="f7 f6-l fw5">
          {tabs &&
            tabs.items.map(tab => (
              <ChartTab
                label={tab.label}
                key={tab.urlParam}
                type={tab.type}
                tabClick={this.tabClick}
                isLoading={this.state.isLoading}
                activePage={this.state.activeTab}
              />
            ))}
          <div className="w-100-m w-50-l w-third-ns pv3 pr3 pr5-ns last-child-pr0">
            {!isNil(value) &&
            !isNil(link) &&
            tooltipItems &&
            tooltipItems.length > 0 ? (
              <div>
                <a
                  target="_blank"
                  href={link}
                  data-tip
                  data-for={label}
                  className="link dark-gray hover-mid-gray lh-solid blank-link-arrow dib hover-no-underline overlay-trigger"
                >
                  {cardValue}
                  {cardLabel}
                  {cardCTA}
                  {cardLoss}
                </a>
                <ReactTooltip
                  class="tooltip-container tooltip-home"
                  delayHide={1000}
                  effect="solid"
                  place="right"
                  id={label}
                >
                  {tooltipItems.map((item, index) => {
                    const link = tooltipLink ? tooltipLink + item : false

                    return (
                      <div key={`tooltip_item_${index}`}>
                        {index < tooltipItemsMaxLength && (
                          <p className="tooltip-item">
                            {link ? (
                              <a
                                className="tooltip-link link blue"
                                href={link}
                                target="_blank"
                              >
                                {item}
                              </a>
                            ) : (
                              <span>{item}</span>
                            )}
                          </p>
                        )}
                      </div>
                    )
                  })}
                  {tooltipItems.length >= tooltipItemsMaxLength && (
                    <p className="tooltip-item mt3 silver">
                      {this.getI18nStr('integrations.tooltip.more', {
                        value: tooltipItems.length - tooltipItemsMaxLength,
                      })}
                    </p>
                  )}
                </ReactTooltip>
              </div>
            ) : value && !isNil(link) ? (
              <a
                target="_blank"
                href={link}
                className="hover-clean-blue link dark-gray hover-mid-gray lh-solid blank-link-arrow hover-no-underline"
              >
                {cardValue}
                {cardLabel}
                {cardCTA}
                {cardLoss}
              </a>
            ) : (
              <div className="link gray lh-solid blank-link-arrow hover-no-underline">
                {cardValue}
                {cardLabel}
                {cardCTA}
                {cardLoss}
              </div>
            )}
          </div>
        </div>
      )
    )
  }
}

DataItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  link: PropTypes.any,
  tooltipItems: PropTypes.array,
  tooltipLink: PropTypes.string,
  loss: PropTypes.number,
  currencyCode: PropTypes.string,
  cta: PropTypes.string,
  tabs: PropTypes.object,
  intl: intlShape,
}

export default injectIntl(DataItem)
