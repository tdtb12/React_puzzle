import React, { Component } from "react";
import "./App.css";
import { Swappable } from "@shopify/draggable";
import Navbar from "./components/navbar";

class App extends Component {
  constructor() {
    super();
    let numbers = [];
    for (let n = 1; n < 16; n++) {
      numbers.push({ id: n, number: n });
    }
    numbers.push({ id: 16, number: "" });

    this.state = { numbers: numbers };
  }
  componentDidMount() {
    const swappable = new Swappable(
      document.querySelectorAll(".container-fluid"),
      {
        draggable: ".draggable",
        mirror: {
          constrainDimensions: true
        }
      }
    );

    var swapped = false; //determine whether the number div is swapped
    swappable.on("swappable:swapped", function() {
      swapped = true;
    });
    swappable.on("swappable:stop", () => {});
    setInterval(function() {
      if (swapped) {
        check();
        swapped = false;
      }
    }, 1500);

    const self = this;
    function check() {
      let nodes = document.getElementsByClassName("content");
      let isSorted = true;
      for (let i = 0; i < 15; i++) {
        if (isSorted) {
          if (nodes[i].innerHTML === (i + 1).toString()) {
            isSorted = true;
          } else isSorted = false;
        }
      }
      if (isSorted) {
        self.setState({ showAlert: true });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar numbers={this.state.numbers} showAlert={this.state.showAlert} />
      </React.Fragment>
    );
  }
}

export default App;
