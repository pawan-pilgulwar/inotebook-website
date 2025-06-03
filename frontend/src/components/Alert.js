import React from "react";

export default function Alerts(props) {
  const capatalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div style={{ height: "50px" }}>
      {props.Alert && (
        <div
          className={`alert alert-${props.Alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capatalize(props.Alert.type)}</strong>: {props.Alert.msg}
        </div>
      )}
    </div>
  );
}
