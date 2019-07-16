import React, { Component } from "react";

class Alert extends Component {
  state = {
    showAlert: this.props.showAlert,
    close: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.showAlert !== this.state.showAlert) {
      this.setState({ showAlert: nextProps.showAlert });
    }
  }

  render() {
    if (this.props.started && this.state.close) {
      this.setState({ close: false });
    }
    if (this.state.showAlert === true && this.state.close === false) {
      document.getElementById("stopBtn").click(); //stop the timer (click stop button)
      return (
        <div className="alert alert-primary alert-dismissible fixed-bottom">
          <button
            type="button"
            className="close"
            onClick={() => {
              this.setState({ close: true }); //if close clicked set true
            }}
          >
            &times;
          </button>
          <strong>Completed!</strong>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Alert;
