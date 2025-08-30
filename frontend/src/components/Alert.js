import React from "react";

export default function Alerts(props) {
  const capatalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div style={{ height: "60px", position: "relative", zIndex: 1050 }}>
      {props.Alert && (
        <div
          className={`alert alert-${props.Alert.type} alert-dismissible fade show`}
          role="alert"
          style={{
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            minWidth: "300px",
            maxWidth: "500px",
            zIndex: 1050,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)"
          }}
        >
          <div className="d-flex align-items-center">
            <i className={`fas fa-${props.Alert.type === 'success' ? 'check-circle' : props.Alert.type === 'danger' ? 'exclamation-triangle' : props.Alert.type === 'warning' ? 'exclamation-circle' : 'info-circle'} me-2`}></i>
            <div>
              <strong>{capatalize(props.Alert.type)}</strong>: {props.Alert.msg}
            </div>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
}
