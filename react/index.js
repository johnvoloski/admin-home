import React, {Component} from 'react'

// eslint-disable-next-line
export default class Admin extends Component {
  componentDidMount() {
    window.postMessage({action: {type: 'STOP_LOADING'}}, '*')
  }

  render() {
    return (
      <div className="ma4">
        <h1>Hello, admin home!</h1>
      </div>
    )
  }
}
