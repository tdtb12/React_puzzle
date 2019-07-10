import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div style={{ width: "25%" }}>
        <div className="draggable">
          <div
            className={this.getClasses()}
            onClick={() => this.props.onClick(this.props.number)}
          >
            <div className="content">{this.props.number.number}</div>
          </div>
        </div>
      </div>
    );
  }

  getClasses() {
    return `card m-1 square ${
      this.props.number.number === "" ? "bg-dark" : "bg-primary"
    }`;
  }
}

export default Card;
