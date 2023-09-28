import React, { useState, useEffect } from "react";
import "./App.css";

const kanjiUnits = [
  { unit: "万", power: 4 },
  { unit: "億", power: 8 },
  { unit: "兆", power: 12 },
  { unit: "京", power: 16 },
  { unit: "垓", power: 20 },
  { unit: "𥝱", power: 24 },
  { unit: "穣", power: 28 },
  { unit: "溝", power: 32 },
  { unit: "澗", power: 36 },
  { unit: "正", power: 40 },
  { unit: "載", power: 44 },
  { unit: "極", power: 48 },
  { unit: "恒河沙", power: 52 },
  { unit: "阿僧祇", power: 56 },
  { unit: "那由他", power: 60 },
  { unit: "不可思議", power: 64 },
  { unit: "無量大数", power: 68 },
];

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [kanjiResult, setKanjiResult] = useState("");

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
    setKanjiResult(toKanjiNumber(result));
  };

  const clearInput = () => {
    setInput("");
    setKanjiResult("");
  };

  const formatNumberWithCommas = (x: string) => {
    const parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const formatWithCommas = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const toKanjiNumber = (num: number, recursive = false): string => {
    if (num < 10000 && !recursive) return formatWithCommas(num);

    let kanjiNum = "";

    for (const { unit, power } of kanjiUnits.slice().reverse()) {
      const divisor = 10 ** power;
      const value = Math.floor(num / divisor);

      if (value > 0) {
        kanjiNum +=
          (value < 10000 || power === 4
            ? formatWithCommas(value)
            : toKanjiNumber(value, true)) + unit;
        num -= value * divisor; // ここを変更
      }
    }

    if (num > 0 && kanjiNum) {
      kanjiNum += formatWithCommas(num);
    } else if (num > 0) {
      kanjiNum = formatWithCommas(num);
    }

    return kanjiNum;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        setInput((prev) => prev + e.key);
        break;
      case "Enter":
        e.preventDefault();
        evaluateExpression();
        break;
      case " ":
        e.preventDefault();
        clearInput();
        break;
      case "+":
      case "-":
      case "/":
      case "*":
        setInput((prev) => prev + e.key);
        break;
      case "Backspace":
      case "Delete":
        setInput((prev) => {
          const updatedValue = prev.slice(0, -1);
          setKanjiResult(toKanjiNumber(parseFloat(updatedValue))); // これを追加
          return updatedValue;
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="App">
      <div className="display">{formatNumberWithCommas(input)}</div>
      <div className="display-jp">{kanjiResult}</div>
      <div className="buttons">
        <button
          data-control
          style={{ gridColumn: "span 3" }}
          onClick={clearInput}
        >
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
