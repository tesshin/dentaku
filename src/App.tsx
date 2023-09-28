import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [input, setInput] = useState("");

  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const evaluateExpression = () => {
    // 正規表現で数字と演算子を分ける
    const regex = /([+\-*/])|([\d.]+)/g;
    const tokens = input.match(regex);
  
    if (!tokens) return;
  
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextValue = parseFloat(tokens[i + 1]);
  
      switch (operator) {
        case "+":
          result += nextValue;
          break;
        case "-":
          result -= nextValue;
          break;
        case "*":
          result *= nextValue;
          break;
        case "/":
          if (nextValue === 0) {
            setInput("エラー");
            return;
          }
          result /= nextValue;
          break;
        default:
          setInput("エラー");
          return;
      }
    }
    setInput(result.toString());
  };  

  const clearInput = () => {
    setInput("");
  };

  const formatNumberWithCommas = (x: string) => {
    const parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <div className="App">
      <div className="display">{formatNumberWithCommas(input)}</div>
      <div className="buttons">
        <button data-control style={{ gridColumn: "span 3" }} onClick={clearInput}>
          AC
        </button>
        <button data-operator onClick={() => handleClick("/")}>
          ÷
        </button>

        <button data-number onClick={() => handleClick("7")}>
          7
        </button>
        <button data-number onClick={() => handleClick("8")}>
          8
        </button>
        <button data-number onClick={() => handleClick("9")}>
          9
        </button>
        <button data-operator onClick={() => handleClick("*")}>
          ×
        </button>

        <button data-number onClick={() => handleClick("4")}>
          4
        </button>
        <button data-number onClick={() => handleClick("5")}>
          5
        </button>
        <button data-number onClick={() => handleClick("6")}>
          6
        </button>
        <button data-operator onClick={() => handleClick("-")}>
          -
        </button>

        <button data-number onClick={() => handleClick("1")}>
          1
        </button>
        <button data-number onClick={() => handleClick("2")}>
          2
        </button>
        <button data-number onClick={() => handleClick("3")}>
          3
        </button>
        <button data-operator onClick={() => handleClick("+")}>
          +
        </button>

        <button
          data-number
          style={{ gridColumn: "span 2" }}
          onClick={() => handleClick("0")}
        >
          0
        </button>
        <button data-number onClick={() => handleClick(".")}>
          .
        </button>
        <button data-control onClick={evaluateExpression}>
          =
        </button>
      </div>
    </div>
  );
};

export default App;
