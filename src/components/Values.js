
import React from "react";

const Values = ({ values = [], player, type }) => {
  return (
    <div className={`history-card ${type || ""}`}>
      <div className="history-heading">
        <span className="history-dot"></span>
        <h3>{player}</h3>
        <span className="move-count">
          {values.length} moves
        </span>
      </div>

      <div className="history-numbers">
        {values.length > 0 ? (
          values.map((value, index) => (
            <span className="history-number" key={index}>
              {value}
            </span>
          ))
        ) : (
          <span className="empty-history">
            Waiting for first move...
          </span>
        )}
      </div>
    </div>
  );
};

export default Values;
