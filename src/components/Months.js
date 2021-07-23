import React, { useRef, useState, useEffect } from "react";
import { add, sub } from "date-fns";
import { takeMonth } from "../utils/CalendarModule";
import Month from "./Month";
import "../css/Months.css";
import { v4 as uuidv4 } from "uuid";
import { getUpdatedDate } from "../utils/UpdatedDate";

import { checkCommonWeekToRemove } from "../utils/CheckCommonWeek";

const MONTH_HEIGHT = 900;

function Months({ date, updateDate }) {
  const [offset, setoffset] = useState(0);
  const monthsContainer = useRef();
  const halfMark = useRef(0);

  useEffect(() => {
    const { current } = monthsContainer;
    current.scrollTop = (current.scrollHeight - current.clientHeight) / 2;
    halfMark.current = current.scrollHeight / MONTH_HEIGHT / 2;
  }, []);

  const handleScroll = (e) => {
    const target = e.target;
    const top = target.scrollTop;
    const month = Math.floor(top / MONTH_HEIGHT);
    if (month !== offset) {
      setoffset(month - halfMark.current);
    }
  };

  const offsetDate = getUpdatedDate(date, offset);

  useEffect(() => {
    updateDate(getUpdatedDate(date, offset));
  }, [offset]);

  return (
    <div
      ref={monthsContainer}
      className="Months__container"
      onScroll={(e) => handleScroll(e)}
    >
      <div style={{ height: "900000px", position: "relative" }}>
        <Month
          top={`${(offset + halfMark.current - 1) * MONTH_HEIGHT}px`}
          month={checkCommonWeekToRemove(
            takeMonth(sub(offsetDate, { months: 1 }))(),
            takeMonth(offsetDate)()
          )}
          date={sub(offsetDate, { months: 1 })}
          visibileDate={takeMonth(add(offsetDate, { months: 1 }))()[0][0]}
        />
        <Month
          top={`${(offset + halfMark.current) * MONTH_HEIGHT}px`}
          month={checkCommonWeekToRemove(
            takeMonth(offsetDate)(),
            takeMonth(add(offsetDate, { months: 1 }))()
          )}
          date={offsetDate}
          visibileDate={takeMonth(add(offsetDate, { months: 1 }))()[0][0]}
        />
        <Month
          top={`${(offset + 1 + halfMark.current) * MONTH_HEIGHT}px`}
          month={takeMonth(add(offsetDate, { months: 1 }))()}
          date={add(offsetDate, { months: 1 })}
          visibileDate={takeMonth(add(offsetDate, { months: 1 }))()[0][0]}
        />
      </div>
    </div>
  );
}

export default Months;
