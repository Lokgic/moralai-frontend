import { v1 } from "uuid";
import { createContext, Component } from "react";
import { shuffle } from "d3";

const Context = createContext();

class ContextProvider extends Component {
  state = {
    forder: shuffle(["age", "drinkingHabitPrediagnosis", "dependents"]),

    userId: v1(),
    version: Math.floor(2 * Math.random()),
    trialId: "coinflip1-pretest"
  };

  render() {
    return (
      <Context.Provider value={{ state: this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const ContextConsumer = Context.Consumer;

export default ContextProvider;
