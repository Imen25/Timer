import React from "react";

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    // this.isClicked = this.isClicked.bind(this);
    // this.isReset = this.isReset.bind(this);
    this.state = {
      isPaused: false,
      sec: 0,
      min: 0,
      hour: 0
    };
  }
  isClicked = () => {
    this.setState({ isPaused: !this.state.isPaused });
    if (this.state.isPaused === false) {
      this.interval = setInterval(() => {
        this.setState({ sec: this.state.sec + 1 });
        this.getMinutes(this.state.sec);
        this.getHours(this.state.min);
      }, 1000);
    } else {
      clearInterval(this.interval);
    }
  };
  isReset = () => {
    this.setState({ sec: 0, min: 0, hour: 0, isPaused: false });
    clearInterval(this.interval);
  };
  getMinutes = sec => {
    if (sec === 60)
      this.setState({
        min: this.state.min + 1,
        sec: 0
      });
    return this.state.min;
  };
  getHours = min => {
    if (min === 60)
      this.setState({
        hour: this.state.hour + 1,
        min: 0
      });
    return this.state.hour;
  };
  render() {
    const isPaused = this.state.isPaused;
    const seconds = this.state.sec;
    const minutes = this.state.min;
    const hours = this.state.hour;

    return (
      <div>
        {!seconds && !minutes && !hours ? (
          <i className="fas fa-redo-alt inactiv" style={{ color: "gray" }}>
            Reset
          </i>
        ) : (
          <i className="fas fa-redo-alt" onClick={this.isReset}>
            Reset
          </i>
        )}
        <div className="Time">
          <div>
            <h1>{hours < 10 ? "0" + hours : hours}</h1>
            <span>Hour</span>
          </div>
          <h1>:</h1>
          <div>
            <h1>{minutes < 10 ? "0" + minutes : minutes}</h1>
            <span>Minute</span>
          </div>
          <h1>:</h1>
          <div>
            <h1>{seconds < 10 ? "0" + seconds : seconds}</h1>
            <span>Second</span>
          </div>
        </div>
        {isPaused ? (
          <i className="fas fa-pause-circle" onClick={this.isClicked} />
        ) : (
          <i className="fas fa-play-circle" onClick={this.isClicked} />
        )}
      </div>
    );
  }
}