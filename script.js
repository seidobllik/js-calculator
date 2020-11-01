/*
Javascript Calculator
Tom Baker

style based on: http://www.vintagecalculators.com/assets/images/TI25001_1.JPG
*/

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equation: "",
      currentValue: "0",
      previousValue: "",
      floating: false,
      isNegative: false,
      evaluated: false };

    this.clear = this.clear.bind(this);
    this.numberEntry = this.numberEntry.bind(this);
    this.arithmeticEntry = this.arithmeticEntry.bind(this);
    this.evaluate = this.evaluate.bind(this);
  }

  clear(value) {
    switch (value) {
      case "C":
        this.setState({
          equation: "",
          currentValue: "0",
          previousValue: "",
          floating: false,
          isNegative: false,
          evaluated: false 
        });
        break;

      case "CE": // need to fix the logic here...
        let equation = this.state.equation.slice(0, -this.state.currentValue.length);
        this.setState({
          equation: equation,
          currentValue: "0",
          previousValue: "",
          floating: false,
          isNegative: false 
        });
        break;

      default:
        break;
    }
  }

  numberEntry(value) {
    let currentValue = this.state.currentValue === "0" ? "" : this.state.currentValue;
    let equation = this.state.equation;
    let evaluated = false;

    if (this.state.evaluated) {
      currentValue = "";
      equation = "";
    }
    if (value === ".") {
      if (this.state.floating) {return;} else
      {this.setState({ floating: true });}
    }
    if (value === "0" && this.state.currentValue === "0") {return;}
    if (["+", "-", "*", "/"].indexOf(currentValue[0]) >= 0) {
      currentValue = "";
    }
    this.setState({
      equation: equation + value,
      currentValue: currentValue + value,
      evaluated: evaluated 
    });
  }

  arithmeticEntry(sign) {
    let equation = this.state.equation;
    let previousValue = "";
    if (this.state.evaluated) {
      equation = "" + this.state.previousValue;
      console.log("working with ", equation, sign);
    }

    if (["+", "-", "*", "/"].indexOf(equation.slice(-1)) >= 0 && sign === "-" && !this.state.isNegative) {
      // user is entering a negative number.
      this.setState({
        equation: equation + sign,
        currentValue: sign,
        previousValue: previousValue,
        floating: false,
        isNegative: true,
        evaluated: false 
      });

    } else if (["+", "-", "*", "/"].indexOf(equation.slice(-1)) >= 0 && sign != "-" && this.state.isNegative) {
      // user is changing negative back.
      this.setState({
        equation: equation.slice(0, -2) + sign,
        currentValue: sign,
        previousValue: previousValue,
        floating: false,
        isNegative: false,
        evaluated: false 
      });

    } else if (["+", "-", "*", "/"].indexOf(equation.slice(-1)) >= 0) {
      // user is changing operator.
      this.setState({
        equation: equation.slice(0, -1) + sign,
        currentValue: sign,
        previousValue: previousValue,
        evaluated: false 
      });

    } else {
      // user entering an operator.
      this.setState({
        equation: equation + sign,
        currentValue: sign,
        previousValue: previousValue,
        floating: false,
        evaluated: false 
      });
    }
  }

  evaluate(sign) {
    let equation = this.state.equation;
    let currentValue = eval(equation);
    let previousValue = currentValue;
    this.setState({
      equation: equation + sign,
      currentValue: currentValue,
      previousValue: previousValue,
      floating: false,
      evaluated: true 
    });
  }

  render() {
    return (
      React.createElement("div", { className: "container calculator" },
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement(Screen, { equation: this.state.equation, immediateValue: this.state.currentValue }))),

      React.createElement("div", { className: "button-panel" },
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement("p", null, "Equationator ", React.createElement("em", null, "light")))),

      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement(Button, { type: "function-button", id: "CE", face: "CE", action: this.clear }),
      React.createElement(Button, { type: "function-button", id: "divide", face: "\xF7", value: "/", action: this.arithmeticEntry }),
      React.createElement(Button, { type: "function-button", id: "multiply", face: "\xD7", value: "*", action: this.arithmeticEntry }))),

      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement(Button, { type: "number-button", id: "seven", face: "7", action: this.numberEntry }),
      React.createElement(Button, { type: "number-button", id: "eight", face: "8", action: this.numberEntry }),
      React.createElement(Button, { type: "number-button", id: "nine", face: "9", action: this.numberEntry }),
      React.createElement(Button, { type: "function-button", id: "clear", face: "C", action: this.clear }))),

      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement(Button, { type: "number-button", id: "four", face: "4", action: this.numberEntry }),
      React.createElement(Button, { type: "number-button", id: "five", face: "5", action: this.numberEntry }),
      React.createElement(Button, { type: "number-button", id: "six", face: "6", action: this.numberEntry }),
      React.createElement(Button, { type: "function-button", id: "subtract", face: "-", action: this.arithmeticEntry }))),

      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement(Button, { type: "number-button", id: "one", face: "1", action: this.numberEntry }),
      React.createElement(Button, { type: "number-button", id: "two", face: "2", action: this.numberEntry }),
      React.createElement(Button, { type: "number-button", id: "three", face: "3", action: this.numberEntry }),
      React.createElement(Button, { type: "function-button", id: "add", face: "+", action: this.arithmeticEntry }))),

      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12" },
      React.createElement(Button, { type: "number-button", id: "zero", face: "0", action: this.numberEntry }),
      React.createElement(Button, { type: "number-button", id: "decimal", face: ".", action: this.numberEntry }),
      React.createElement(Button, { type: "function-button", id: "equals", face: "=", action: this.evaluate }))))));

  }
}



class Screen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement("div", { className: "screen" },
      React.createElement("div", null,
      React.createElement("p", { id: "equation-display" }, this.props.equation)),

      React.createElement("div", null,
      React.createElement("p", { id: "display" }, this.props.immediateValue))));
  }
}



class Button extends React.Component {
  constructor(props) {
    super(props);
    let value = this.props.value === undefined ? this.props.face : this.props.value;
    this.state = {
      type: this.props.type,
      id: this.props.id,
      value: value,
      face: this.props.face,
      action: this.props.action };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.action(this.state.value);
  }

  render() {
    return (
      React.createElement("div", { className: "btn btn-secondary " + this.state.type, id: this.state.id, onClick: this.handleClick }, this.state.face));
  }
}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById("root"));