import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppData, setFilter, setSorted } from "../Redux/action";
import { Row } from "./Row";
import { v4 as uuid } from "uuid";
import { TableHead } from "./TableHead";
import { Setting } from "./Setting";
import { DateRangePickerUi } from "./DateRangePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faCalendar } from "@fortawesome/free-solid-svg-icons";
import styles from "../CSS/Table.module.css";
import { Filter } from "./Filter";

let arr = [
  { id: 1, name: "Date", key: "strDate" },
  { id: 2, name: "App", key: "app_name" },
  { id: 3, name: "Clicks", key: "clicks" },
  { id: 4, name: "Ad Requests", key: "requests" },
  { id: 5, name: "Ad Response", key: "responses" },
  { id: 6, name: "Impression", key: "impressions" },
  { id: 7, name: "Revenue", key: "revenue" },
  { id: 8, name: "Fill Rate", key: "fillRate" },
  { id: 9, name: "CTR", key: "ctr" },
];

export const Table = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.app.list);
  const filterData = useSelector((state) => state.app.filterList);
  const dateRange = useSelector((state) => state.app.dateRange);
  const [data, setData] = useState(arr);
  const [showDate, setShowDate] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [resetFilterStatus, setResetFilter] = useState(false);
  const [filterId, setFilterId] = useState(1);
  const [filterName, setFilterName] = useState("Date");
  const handleShowCalender = () => {
    setShowDate(true);
  };

  const handleHideCalender = () => {
    setShowDate(false);
  };

  useEffect(() => {
    dispatch(getAppData(dateRange));
  }, [dateRange]);

  const handleShowSetting = () => {
    setShowSetting(!showSetting);
  };

  const handleHideSetting = () => {
    setShowSetting(false);
  };

  const handleSorting = (id) => {
    let key = data.filter((el) => el.id === id);
    key = key[0].key;
    let updateArray = tableData.sort((a, b) =>
      a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0
    );
    updateArray = updateArray.map((el) => {
      return el;
    });
    dispatch(setSorted(updateArray));
  };

  const handleOpenFilter = (payload) => {
    setFilterId(payload.id);
    setResetFilter(true);
    if (!filterShow && filterData.length === 0) {
      let updatedData = tableData.map((el) => {
        return el;
      });
      dispatch(setFilter(updatedData));
    }
      setFilterShow(true);
      setFilterName(payload.name)
  };

  const handleCloseFilter = () => {
    setFilterShow(false);
  };

  const resetFilter = () => {
    let updatedData = tableData.map((el) => {
      return el;
    });
    dispatch(setFilter(updatedData));
  };

  const handleFilter = (text) => {
    let key = data.filter((el) => el.id === filterId);
    key = key[0].key;
    let updatedData = [];
    if (filterId === 2) {
      updatedData = tableData.filter((el) => el[key].includes(text));
    } else {
      let newText = text.split("-");
      if (newText[0] !== undefined && newText[1] !== undefined) {
        let value1 = Number(newText[0]);
        let value2 = Number(newText[1]);
        updatedData = tableData.filter(
          (el) => el[key] > value1 && el[key] < value2
        );
      }
    }
    updatedData = updatedData.map((el) => {
      return el;
    });
    dispatch(setFilter(updatedData));
  };

  return (
    <>
      <div style={{ width: "80vw" }} className="mx-auto mt-5">
        <h4>Analytics</h4>
        <div className={styles.nav}>
          {showDate ? (
            <div></div>
          ) : (
            <div className={styles.iconBox} onClick={handleShowCalender}>
              <FontAwesomeIcon icon={faCalendar} />
              <span className={styles.icon}>
                {dateRange.startDate + "/" + dateRange.endDate}
              </span>
            </div>
          )}

          <div className={styles.iconBox} onClick={handleShowSetting}>
            Setting
            <span className={styles.icon}>
              {" "}
              <FontAwesomeIcon icon={faColumns} />
            </span>
          </div>
        </div>
        {showDate ? (
          <div className="mx-auto mt-5 row" style={{ width: "80vw" }}>
            <div>
              <DateRangePickerUi />
              <button
                className={styles.button}
                style={{ marginLeft: "15px" }}
                onClick={handleHideCalender}
              >
                close calender
              </button>
            </div>
          </div>
        ) : null}

        {showSetting ? (
          <div className="mx-auto mt-5 d-flex" style={{ width: "80vw" }}>
            <Setting data={data} handleHideSetting={handleHideSetting} />
          </div>
        ) : null}

        {filterShow ? (
          <div className="mx-auto mt-5" style={{ width: "80vw" }}>
            <Filter
              handleCloseFilter={handleCloseFilter}
              resetFilter={resetFilter}
                          handleFilter={handleFilter}
                          filterName={filterName}
            />
          </div>
        ) : null}
        <div
          className="mx-auto mt-5 row "
          style={{ width: "80vw", marginBottom: "5vh" }}
        >
          {data.map((el, i) => {
            return (
              <TableHead
                handleOpenFilter={handleOpenFilter}
                handleSorting={handleSorting}
                key={el.id}
                item={el}
                i={i}
              />
            );
          })}

          {resetFilterStatus
            ? filterData?.map((el) => {
                let id = uuid();
                return <Row key={id} item={el} />;
              })
            : tableData?.map((el) => {
                let id = uuid();
                return <Row key={id} item={el} />;
              })}
        </div>
      </div>
    </>
  );
};
