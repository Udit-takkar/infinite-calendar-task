import React from "react";
import "../css/LegendCodes.css";

function LegendCodes({ typeofday }) {
  const HAIR_CUT = "hair cut";
  const PROTEIN_TREATMENT = "protein treatment";
  const HAIR_COLOR = "hair color";
  const CLARIFYING = "clarifying";
  const DEEP_CONDITIONING = "deep conditioning";

  const Codes = [];
  typeofday.forEach((day) => {
    if (day === HAIR_CUT) {
      Codes.push("Cu");
    } else if (day === PROTEIN_TREATMENT) {
      Codes.push("Pr");
    } else if (day === HAIR_COLOR) {
      Codes.push("HC");
    } else if (day === CLARIFYING) {
      Codes.push("C");
    } else if (day === DEEP_CONDITIONING) {
      Codes.push("DC");
    }
  });
  return (
    <div className="codes__container">
      {Codes.map((code) => {
        return <div className={`${code} code `}>{code}</div>;
      })}
    </div>
  );
}

export default LegendCodes;
