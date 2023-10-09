import React from "react";
import "./App.css";

function App() {
  const inputRef = React.useRef();

  function handleKeyDown(e) {
    if (
      inputRef.current.selectionEnd === inputRef.current.selectionStart &&
      !e.ctrlKey
    ) {
      let keyAdjustment = 0;

      e.key === "Delete" &&
      /\D+/g.test(inputRef.current.value[inputRef.current.selectionEnd])
        ? (keyAdjustment = 1)
        : e.key === "Backspace" &&
          /\D+/g.test(
            inputRef.current.value[inputRef.current.selectionEnd - 1]
          ) &&
          inputRef.current.value[inputRef.current.selectionEnd - 1]
        ? (keyAdjustment = -1)
        : null;

      inputRef.current.selectionEnd += keyAdjustment;
      inputRef.current.selectionStart += keyAdjustment;
    }
  }

  function handleChange() {
    let value = inputRef.current.value.replace(/\D+/g, "");
    let endSelection =
      inputRef.current.selectionEnd -
      (inputRef.current.value
        .substring(0, inputRef.current.selectionEnd)
        .split(/\D/g).length -
        1);
    let separatorAmount =
      BigInt(value).toLocaleString("en").split(/\D+/g).length - 1;

    separatorAmount -=
      Math.floor((value.substring(endSelection).length - 1) / 3) !== -1
        ? Math.floor((value.substring(endSelection).length - 1) / 3)
        : 0;

    inputRef.current.value = BigInt(value).toLocaleString("en");
    inputRef.current.selectionEnd = endSelection + separatorAmount;
    inputRef.current.selectionStart = endSelection + separatorAmount;
    inputRef.current.value === "0" ? (inputRef.current.value = "") : null;
  }

  return (
    <input
      style={{ textAlign: "right" }}
      ref={inputRef}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export default App;
