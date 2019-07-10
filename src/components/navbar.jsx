import React, { Component } from "react";

class Navbar extends Component {
  state = {
    numbers: this.props.numbers,
    started: false,
    stopped: false,
    time: "0:0:0"
  };
  render() {
    return (
      <nav className="navbar bg-secondary ">
        <div style={{ margin: " 0 auto" }}>
          <span className="badge badge-pill badge-info">{this.state.time}</span>
          <button
            type="button"
            className="btn btn-primary m-2"
            onClick={() => this.start()}
            disabled={this.state.started}
          >
            Start
          </button>
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={() => this.stop()}
            disabled={!this.state.started}
          >
            Stop
          </button>
        </div>
      </nav>
    );
  }
  setTimer;
  totalSeconds = 0;
  timer(run) {
    if (run) {
      this.setTimer = setInterval(() => {
        this.totalSeconds += 1;
        let time = `${Math.floor(this.totalSeconds / 3600)} : ${Math.floor(
          this.totalSeconds / 60
        )} : ${this.totalSeconds % 60}`;
        this.setState({ time: time });
      }, 1000);
    } else {
      clearInterval(this.setTimer);
      this.totalSeconds = 0;
      this.setState({ time: "0 : 0 : 0" });
    }
  }
  start() {
    let started = { ...this.state.started };
    this.setState({ started: started });
    this.timer(true);
  }
  stop() {
    let started = { ...this.state.started };
    this.setState({ started: !started });
    this.timer(false);
  }
}

export default Navbar;
