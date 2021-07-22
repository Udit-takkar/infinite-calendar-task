import React, { useState } from "react";
import Header from "./Header";
import Months from "./Months";
import "../css/Calendar.css";
import ShowModal from "./ShowModal";
import { useSelector, useDispatch } from "react-redux";
import { getModalState } from "../features/modal";
import { fetchPosts } from "../features/calendar";

function Calendar() {
  const date = new Date(2020, 8, 15);
  const isModalActive = useSelector(getModalState);

  const dispatch = useDispatch();

  const [headerDate, setHeaderDate] = useState(new Date(date));

  const updateDate = async (newDate) => {
    setHeaderDate(new Date(newDate));
    await dispatch(fetchPosts(newDate));
  };

  return (
    <div className="Calendar__container">
      <Header headerDate={headerDate} />
      <div className="Calendar__container__Months">
        <Months date={date} updateDate={updateDate} />
      </div>
      {isModalActive && <ShowModal />}
    </div>
  );
}

export default Calendar;
