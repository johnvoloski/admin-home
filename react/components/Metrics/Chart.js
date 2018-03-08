import React from 'react'
import PropTypes from 'prop-types'

import { injectIntl, intlShape } from 'react-intl'
import CustomTooltip from './CustomTooltip'
import CustomizedXAxisTick from './CustomizedXAxisTick'
import CustomizedYAxisTick from './CustomizedYAxisTick'
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
} from 'recharts'

class Chart extends React.Component {
  getI18nStr = id => this.props.intl.formatMessage({ id })

  render() {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={this.props.data}>
          <XAxis
            dataKey="date"
            interval="preserveStart"
            tick={<CustomizedXAxisTick />}
          />
          <YAxis
            domain={['dataMin - 500', 'dataMax + 500']}
            scale="linear"
            tick={<CustomizedYAxisTick />}
          />
          <CartesianGrid />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} iconType="line" />
          <Line
            type="linear"
            legendType="square"
            dot={false}
            dataKey={this.getI18nStr('metric.pageload.legend.pageLoadStore')}
            stroke="#F71963"
          />
          <Line
            type="linear"
            legendType="square"
            dot={false}
            dataKey={this.getI18nStr('metric.pageload.legend.pageLoadGlobal')}
            stroke="#00bbd4"
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

Chart.propTypes = {
  data: PropTypes.array,
  intl: intlShape,
}

export default injectIntl(Chart)
