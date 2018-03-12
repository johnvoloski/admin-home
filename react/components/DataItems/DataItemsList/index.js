import React from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

import DataItem from '../DataItem'

class DataItemsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sectionIsNotEmpty: false,
      items: props.items,
    }
  }

  render() {
    const { title, items } = this.props

    return (
      <div>
        <h3
          className="mt4 mb0 f4 lh-copy font-display"
          style={{ borderBottom: '1px solid #EEF3F9' }}
        >
          {title}
        </h3>

        <div className="data-items flex flex-wrap items-start black-70">
          {items.map((dataitem, index) => (
            <DataItem
              key={index + '+dataItem'}
              value={dataitem.value}
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
