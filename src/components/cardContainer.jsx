import React, { Component } from "react";
import Card from "./card";
class CardContainer extends Component {
  render() {
    return (
      <div className="container-fluid bg-dark">
        <div className="row " style={{ width: "40%", margin: " 0 auto" }}>
          {this.props.numbers.map(number => {
            //const index = this.state.numbers.indexOf(number.id);
            return (
              <Card
                key={number.id}
                number={number}
                onClick={this.props.onClick}
                check={this.props.check}
                numbers={this.props.numbers}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default CardContainer;
