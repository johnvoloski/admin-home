import React from 'react'
import PropTypes from 'prop-types'

export const Article = props => (
  <a
    className="dib pa3 w-100 w-50-ns v-top lh-copy dark-gray link hover-no-underline hover-bg-near-white damp-green hover-dark-green"
    href={props.link}
    target="_blank"
  >
    <header className="">
      <h3 className="mt0 f5 fw4 lh-copy font-display hover-no-underline link">
        {props.title}
      </h3>
    </header>
    <p className="ma0 lh-copy font-body f5 mid-gray">{props.excerpt}</p>
  </a>
)

Article.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
}
