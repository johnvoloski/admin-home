import React from 'react'
import PropTypes from 'prop-types'

export const Announcement = props => (
  <div>
    <p>{props.title}</p>
    <p>{props.content}</p>
  </div>
)

Announcement.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
}
