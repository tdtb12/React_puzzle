import React, { Component } from "react";
import CardContainer from "./cardContainer";
import Alert from "./alert";

class Navbar extends Component {
  state = {
    numbers: this.props.numbers,
    started: false,
    time: "0:0:0",
    showAlert: this.props.showAlert
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.showAlert !== this.state.showAlert) {
      this.setState({ showAlert: nextProps.showAlert });
    }
    if (nextProps.numbers !== this.state.numbers) {
      this.setState({ numbers: nextProps.numbers });
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar bg-secondary ">
          <div style={{ margin: " 0 auto" }}>
            <span className="badge badge-pill badge-info">
              {this.state.time}
            </span>
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
              id="stopBtn"
              className="btn btn-danger m-2"
              onClick={() => this.stop()}
              disabled={!this.state.started}
            >
              Stop
            </button>
          </div>
        </nav>
        <CardContainer
          numbers={this.state.numbers}
          onClick={this.onClick.bind(this)}
        />

        <Alert
          showAlert={this.state.showAlert}
          close={this.props.close}
          started={this.state.started}
        />
      </React.Fragment>
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
    }
  }
  start() {
    this.randomNumbers();
    if (this.props.showAlert) {
      this.setState({ showAlert: false });
    } //if already sort before started will be true
    this.setState({ started: true, close: false });
    this.timer(true); //enable timer
  }
  stop() {
    this.setState({ started: false });
    this.timer(false); //disable timer
  }
  randomNumbers() {
    let numbers = [...this.state.numbers];
    for (let i = 1; i < 16; i++) {
      var x = Math.floor(Math.random() * 15); /*x= 0~15 random */
      var temp = numbers[x]; /*temp=arr[random]*/
      numbers[x] = numbers[i];
      numbers[i] = temp; /*swap(arr[x],arr[i])*/
    }
    this.setState({ numbers: numbers });
  }
  onClick(number) {
    const self = this;
    const index = this.state.numbers.indexOf(number); //find clicked index in numbers
    const blankIndex = (() => {
      //find blank index in numbers
      for (let i = 0; i < 16; i++)
        if (this.state.numbers[i].number === "") return i;
    })();

    if (isNear(index, blankIndex)) {
      swap(index, blankIndex);
    }

    function swap(index, blankIndex) {
      const numbers = [...self.state.numbers];
      numbers[index] = { ...self.state.numbers[index] };
      numbers[blankIndex] = { ...numbers[blankIndex] };
      const clickedValue = self.state.numbers[index].number;
      numbers[index].number = "";
      numbers[blankIndex].number = clickedValue;

      self.setState({ numbers: numbers });
      check(numbers);
    }
    function isNear(index1, index2) {
      if (Math.abs(index1 - index2) === 1 || Math.abs(index1 - index2) === 4)
        return true;
      else return false;
    }
    function check(numbers) {
      let isSorted = true;
      for (let i = 0; i < 15; i++) {
        if (isSorted) {
          if (numbers[i].number === numbers[i].id) {
            isSorted = true;
          } else isSorted = false;
        }
      }
      if (isSorted) {
        self.setState({ showAlert: true });
      }
    }
  }
}

export default Navbar;
