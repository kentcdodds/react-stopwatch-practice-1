import React, {Component, PropTypes} from 'react'

class StopWatch extends Component {
  static propTypes = {
    buttonStyles: PropTypes.object,
  }
  state = {
    running: false,
    lapse: 0,
  }

  _now = 0
  _timer = null

  handleRunClick = () => {
    if (this.state.running) {
      this.stop()
    } else {
      this.start()
    }
  }

  handleClearClick = () => {
    this.stop()
    this._now = 0
    this.setState({lapse: 0})
  }

  start() {
    this._timer = setInterval(() => {
      this.setState({
        lapse: Date.now() - this._now,
      })
    }, 1)

    this._now = Date.now() - this.state.lapse
    this.setState({running: true})
  }

  stop() {
    clearInterval(this._timer)
    this._timer = null
    this.setState({running: false})
  }

  render() {
    const {buttonStyles} = this.props
    return (
      <div style={{textAlign: 'center'}}>
        <label style={{fontSize: '5em', display: 'block'}} data-test="ms">{this.state.lapse}ms</label>
        <button style={buttonStyles} onClick={this.handleRunClick} data-test="toggle">{this.state.running ? 'Stop' : 'Start'}</button>
        <button style={buttonStyles} onClick={this.handleClearClick} data-test="clear">Clear</button>
      </div>
    )
  }
}

export default StopWatch
