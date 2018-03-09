import React from 'react'

class RedBlock extends React.Component {
  render() {
    return (
      <div
        style={{
          zIndex: 0,
          position: 'fixed',
          top: '-60px',
          left: '50%',
          width: '130%',
          height: '510px',
          background: '#F71963',
          transform: 'rotate(-7deg) translate(-50%, -50%)',
        }}
      />
    )
  }
}

export default RedBlock
