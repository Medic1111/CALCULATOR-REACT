import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "./features/calculator";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const display = useSelector((state) => state.Calculator.display);
  const previous = useSelector((state) => state.Calculator.previous);
  const record = useSelector((state) => state.Calculator.record.join(""));
  const [operator, setOperator] = useState("");

  const [resultIn, setResultIn] = useState(false);
  const [showResult, setShowResult] = useState("");

  const setDisplayHandler = (event) => {
    setResultIn(false);
    if (display.includes(".") && event.target.value === ".") {
      return;
    }
    dispatch(actions.setDisplay(event.target.value));
    dispatch(actions.pushToRecord(event.target.value));

    // TEST:
    dispatch(actions.setPrevious(event.target.value));
  };

  const clearHandler = () => {
    dispatch(actions.clear());
    dispatch(actions.clearRecord());
    setResultIn(false);
  };

  const setPrevAndOperate = (event) => {
    setOperator(event.target.value);

    if (event.target.value !== "-") {
      if (previous === "+" || previous === "/" || previous === "*") {
        if (operator === "+" || operator === "/" || operator === "*") {
          dispatch(actions.popRecord());
        } else if (operator === "-") {
          dispatch(actions.popRecord());
          dispatch(actions.popRecord());
        }
      }
    }

    if (event.target.value === "-" && previous === "-") {
      return;
    }

    setResultIn(true);
    setShowResult(event.target.value);
    dispatch(actions.pushToRecord(event.target.value));

    if (display === "0") return;
    dispatch(actions.setPrevious(display));
    dispatch(actions.clear());

    // TEST:
    dispatch(actions.setPrevious(event.target.value));
  };

  const equal = () => {
    setResultIn(true);
    let result = eval(record);

    setShowResult(result);
    dispatch(actions.clearRecord());
    dispatch(actions.pushToRecord(result));
  };

  return (
    <div className="calculator">
      <div className="display">
        <p id="record" className="span">
          {record}
        </p>
        <span id="display" className="span">
          {resultIn ? showResult : display}
        </span>
      </div>
      <div className="btnBox">
        <button
          value="0"
          onClick={setDisplayHandler}
          className="numBtn"
          id="zero"
        >
          0
        </button>

        <button
          value="1"
          onClick={setDisplayHandler}
          className="numBtn"
          id="one"
        >
          1
        </button>

        <button
          value="2"
          onClick={setDisplayHandler}
          className="numBtn"
          id="two"
        >
          2
        </button>

        <button
          value="3"
          onClick={setDisplayHandler}
          className="numBtn"
          id="three"
        >
          3
        </button>
        <button
          value="4"
          onClick={setDisplayHandler}
          className="numBtn"
          id="four"
        >
          4
        </button>
        <button
          value="5"
          onClick={setDisplayHandler}
          className="numBtn"
          id="five"
        >
          5
        </button>
        <button
          value="6"
          onClick={setDisplayHandler}
          className="numBtn"
          id="six"
        >
          6
        </button>
        <button
          value="7"
          onClick={setDisplayHandler}
          className="numBtn"
          id="seven"
        >
          7
        </button>
        <button
          value="8"
          onClick={setDisplayHandler}
          className="numBtn"
          id="eight"
        >
          8
        </button>
        <button
          value="9"
          onClick={setDisplayHandler}
          className="numBtn"
          id="nine"
        >
          9
        </button>
        <button onClick={equal} className="numBtn" id="equals">
          =
        </button>
        <button
          value="+"
          onClick={setPrevAndOperate}
          className="numBtn"
          id="add"
        >
          +
        </button>
        <button
          value="-"
          onClick={setPrevAndOperate}
          className="numBtn"
          id="subtract"
        >
          -
        </button>
        <button
          value="/"
          onClick={setPrevAndOperate}
          className="numBtn"
          id="divide"
        >
          /
        </button>
        <button
          value="*"
          onClick={setPrevAndOperate}
          className="numBtn"
          id="multiply"
        >
          *
        </button>
        <button
          value="."
          onClick={setDisplayHandler}
          className="numBtn"
          id="decimal"
        >
          .
        </button>
        <button onClick={clearHandler} className="numBtn" id="clear">
          C
        </button>
      </div>
    </div>
  );
}

export default App;
