import React from 'react'
import PropTypes from 'prop-types'

import DataItem from '../components/DataItems/DataItem'

class NextActions extends React.Component {
  render() {
    const { value, label, link } = this.props

    return (
      <DataItem
        // key={index + '+dataItem'}
        value={value}
        label={label}
        // cta={dataitem.cta}
        link={link}
        // tooltipLink={dataitem.tooltipLink}
        // tooltipItems={dataitem.tooltip}
        // loss={dataitem.loss}
        // currencyCode={dataitem.currencyCode}
        // tabs={dataitem.tabs}
      />
    )
  }
}

NextActions.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  link: PropTypes.string,
}

export default NextActions
