import React, { Component } from "react";
import "./App.css";
import CardContainer from "./components/cardContainer";
import { Swappable } from "@shopify/draggable";
import Alert from "./components/alert";
import Navbar from "./components/navbar";

class App extends Component {
  constructor() {
    super();
    let numbers = [];
    for (let n = 1; n < 16; n++) {
      numbers.push({ id: n, number: n });
    }
    numbers.push({ id: 16, number: "" });
    for (let i = 1; i <= 8; i++) {
      var x = Math.floor(Math.random() * 8); /*x= 0~8 random */
      var temp = numbers[x]; /*temp=arr[random]*/
      numbers[x] = numbers[i];
      numbers[i] = temp; /*swap(arr[x],arr[i])*/
    }
    this.state = { numbers: numbers, showAlert: false };
  }
  componentDidMount() {
    const swappable = new Swappable(document.querySelectorAll(".container"), {
      draggable: ".draggable",
      mirror: {
        constrainDimensions: true
      }
    });

    var swapped = false; //determine whether the number div is swapped
    swappable.on("swappable:swapped", function() {
      swapped = true;
    });
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
          if (nodes[i].innerHTML == (i + 1).toString()) {
            isSorted = true;
          } else isSorted = false;
        }
      }
      let showAlert = { ...self.state.showAlert };
      showAlert = isSorted;
      self.setState({ showAlert: showAlert });
    }
  }

  onClick = number => {
    const index = this.state.numbers.indexOf(number); //find clicked index in numbers
    const blankIndex = (() => {
      //find blank index in numbers
      for (let i = 0; i < 16; i++)
        if (this.state.numbers[i].number === "") return i;
    })();
    if (this.isNear(index, blankIndex)) {
      this.swap(index, blankIndex);
    }
  };

  swap = (index, blankIndex) => {
    const numbers = [...this.state.numbers];
    numbers[index] = { ...this.state.numbers[index] };
    numbers[blankIndex] = { ...numbers[blankIndex] };
    const clickedValue = this.state.numbers[index].number;
    numbers[index].number = "";
    numbers[blankIndex].number = clickedValue;

    this.setState({ numbers: numbers });
    this.check(numbers);
  };
  isNear = (index1, index2) => {
    if (Math.abs(index1 - index2) === 1 || Math.abs(index1 - index2) === 4)
      return true;
    else return false;
  };

  check = numbers => {
    let isSorted = true;
    for (let i = 0; i < 15; i++) {
      if (isSorted) {
        if (numbers[i].number === numbers[i].id) {
          isSorted = true;
        } else isSorted = false;
      }
    }
    let showAlert = { ...this.state.showAlert };
    showAlert = isSorted;
    this.setState({ showAlert: showAlert });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <CardContainer
          numbers={this.state.numbers}
          onClick={this.onClick}
          check={this.check}
        />

        <Alert showAlert={this.state.showAlert} />
      </React.Fragment>
    );
  }
}

export default App;
