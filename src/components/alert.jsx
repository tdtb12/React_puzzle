import React, { Component } from "react";

class Alert extends Component {
  state = {
    close: false //local state to determine whether close button is clicked
  };
  render() {
    if (this.props.showAlert === true && this.state.close === false) {
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
      this.state.close = false;
      return null;
    }
  }
}

export default Alert;
