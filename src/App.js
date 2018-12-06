import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider, connect } from "react-redux";
import store from "./store";
//import { UPDATE_MESSAGE } from "./store/types";
import { generateUpdateMessageAction } from "./store/actions";

const s = store;

console.log("Store: ", s);
console.log("Store state : ", s.getState());

// React code
const CountWords = ({ message }) => (
  <p>There are {message.split(" ").filter(Boolean).length} words</p>
);

const CountCoffees = ({ message }) => (
  <p>
    You drank
    {
      message
        .split(" ")
        .filter(Boolean)
        .filter(w => w === "espresso").length
    }
    espressos
  </p>
);

const mapStateToProps = ({ message }) => ({ message });

const mapDispatchToProps = dispatch => {
  return {
    dispatchUpdateMessage: message => {
      dispatch(generateUpdateMessageAction(message));
    }
  };
};

const ConnectMessagePropToComponent = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ConnectedCountWords = ConnectMessagePropToComponent(CountWords);

const ConnectedCountCoffees = ConnectMessagePropToComponent(CountCoffees);

class App extends Component {
  // state = {
  //   message: "Ciao"
  // };

  handleChange = ({ target: { value } }) => {
    // no longer used this.setState({ message: e.target.value });
    // this fn needs to update the redux state

    // 1. generate action
    // const action = {
    //   type: "UPDATE_MESSAGE",
    //   payload: value
    // };

    // 2. dispatch action
    //store.dispatch(action);
    this.props.dispatchUpdateMessage(value);
  };

  render() {
    const {
      props: { message }
    } = this;
    return (
      <>
        <input type="text" value={message} onChange={this.handleChange} />

        <p>The message is: {message}</p>
        <ConnectedCountWords />
        <ConnectedCountCoffees />
      </>
    );
  }
}

const ConnectedApp = ConnectMessagePropToComponent(App);

const Container = props => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default Container;
