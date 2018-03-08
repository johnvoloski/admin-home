import React from 'react'
import PropTypes from 'prop-types'

import { intlShape, injectIntl } from 'react-intl'

import DataItem from '../DataItem'
import SectionTitle from '../../Titles/Section'
import SectionSubTitle from '../../Titles/Section/SectionSubTitle'

import { any } from 'ramda'

class DataItemsList extends React.Component {
  constructor() {
    super()

    this.state = {
      sectionIsNotEmpty: false,
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   if (this.hasValue(nextProps.items)) {
  //     this.setState({ sectionIsNotEmpty: true })
  //     return true
  //   }
  //   return false
  // }

  moreThanZero(item) {
    return item.value > 0
  }

  hasValue(items) {
    return any(this.moreThanZero)(items)
  }

  getI18nStr = id => this.props.intl.formatMessage({ id })

  render() {
    return (
      <div className="cf">
        {this.props.listIndex === 0 && (
          <div>
            <SectionTitle text="integrations.actions.title" />
            <SectionSubTitle text="integrations.actions.subTitle" />
          </div>
        )}

        {this.state.sectionIsNotEmpty && (
          <div>
            <h3 className="mt4 mb0 f4 lh-copy font-display">
              {this.getI18nStr(this.props.title)}
            </h3>

            <div className="data-items flex flex-wrap items-start black-70">
              {this.props.items.map((dataitem, index) => (
                <DataItem
                  key={index + '+dataItem'}
                  value={parseInt(dataitem.value)}
                  label={dataitem.label}
                  cta={dataitem.cta}
                  link={dataitem.link}
                  tooltipLink={dataitem.tooltipLink}
                  tooltipItems={dataitem.tooltip}
                  loss={dataitem.loss}
                  currencyCode={dataitem.currencyCode}
                  tabs={dataitem.tabs}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

DataItemsList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  intl: intlShape,
  listIndex: PropTypes.number,
}

export default injectIntl(DataItemsList)
