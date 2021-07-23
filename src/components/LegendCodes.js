import React from "react";
import "../css/LegendCodes.css";
import { v4 as uuidv4 } from "uuid";
import { getModalState } from "../features/modal";
import { useSelector, useDispatch } from "react-redux";

function LegendCodes({ typeofday }) {
  const HAIR_CUT = "hair cut";
  const PROTEIN_TREATMENT = "protein treatment";
  const HAIR_COLOR = "hair color";
  const CLARIFYING = "clarifying";
  const DEEP_CONDITIONING = "deep conditioning";
  const isModalActive = useSelector(getModalState);

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
        return (
          <div
            key={uuidv4()}
            className={`${code} ${isModalActive ? "Modal-Code" : "code"}   `}
          >
            {code}
          </div>
        );
      })}
    </div>
  );
}

export default LegendCodes;
