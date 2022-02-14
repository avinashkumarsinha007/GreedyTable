import {
  DATE_RANGE,
  GET_APP_DATA_FAILURE,
  GET_APP_DATA_REQUEST,
  GET_APP_DATA_SUCCESS,
  GET_TABLE_DATA_FAILURE,
  GET_TABLE_DATA_REQUEST,
  GET_TABLE_DATA_SUCCESS,
  SET_COLUMN,
  SET_FILTER,
  SET_SORTED,
} from "./actionType";
import moment from "moment";

const inState = {
  isLoading: false,
  isError: false,
  list: [],
  filterList:[],
  appList: {},
  dateRange: { startDate: "2021-05-01", endDate: "2021-05-03" },
  booleanColumn: [
    { id: 1, value: true },
    { id: 2, value: true },
    { id: 3, value: true },
    { id: 4, value: true },
    { id: 5, value: true },
    { id: 6, value: true },
    { id: 7, value: true },
    { id: 8, value: true },
    { id: 9, value: true },
  ]
};

export const reducer = (state = inState, { type, payload }) => {
  switch (type) {
    case GET_TABLE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TABLE_DATA_SUCCESS:
      {
        for (let i = 0; i < payload?.length; i++)
        {
          let fillRate = parseFloat((payload[i].requests / payload[i].responses) * 100).toFixed(2);
          let ctr = parseFloat((payload[i].clicks / payload[i].impressions) * 100).toFixed(2);
          let revenue = parseFloat((payload[i].revenue)).toFixed(2);
          let strDate = moment(payload[i].date).utc().format("Do MMM YYYY");
          payload[i].fillRate = Number(fillRate);
          payload[i].ctr = Number(ctr);
          payload[i].revenue = Number(revenue);
          payload[i].strDate = strDate;
        }

        return {
          ...state,
          isLoading: false,
          list: payload.map((item) => {
            return { ...item, app_name: state.appList[item.app_id] };
          }),
        };
      }
     
    case GET_TABLE_DATA_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case GET_APP_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_APP_DATA_SUCCESS: {
      let obj = {};
      for (var i = 0; i < payload.length; i++) {
        obj[payload[i].app_id] = payload[i].app_name;
      }
      return {
        ...state,
        isLoading: false,
        appList: obj,
      };
    }
    case GET_APP_DATA_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case DATE_RANGE:
      return {
        ...state,
        dateRange: payload,
      };
    case SET_COLUMN:
      return {
        ...state,
        booleanColumn: payload,
      };
      case SET_SORTED:
        return {
          ...state,
          list:payload,
      };
      case SET_FILTER:
        return {
          ...state,
          filterList:payload,
        };
    default:
      return state;
  }
};
