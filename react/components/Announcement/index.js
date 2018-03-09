import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

class Announcement extends React.Component {
  render() {
    const { intl, image, link, date, title, content } = this.props

    return (
      <div>
        <a
          className="dib pa3 w-100 lh-copy dark-gray link hover-no-underline hover-bg-near-white flex flex-row space-between bb b--washed-blue bw1 mb6"
          href={link}
          target="_blank"
        >
          <div className="w-20">
            <img
              src={image}
              style={{ maxWidth: '100%', borderRadius: '50%' }}
            />
          </div>
          <div className="w-70">
            <h3 className="mt0 serious-black">{title}</h3>
            <p>{content}</p>
            <p className="f6 gray">{intl.formatRelative(date)}</p>
          </div>
        </a>
      </div>
    )
  }
}

Announcement.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  link: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  intl: intlShape,
}

export default injectIntl(Announcement)
