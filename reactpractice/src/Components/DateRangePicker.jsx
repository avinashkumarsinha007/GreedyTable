import { DateRangePicker } from 'react-date-range';
import React, { useEffect, useState } from 'react';
import { addDays } from 'date-fns';
import { useDispatch } from "react-redux"
import { setDateRange } from '../Redux/action';
import moment from "moment";

export const DateRangePickerUi=()=> {
    const [state, setState] = useState([
        {
          startDate: new Date(2021,7,14),
          endDate: addDays(new Date(2021,7,14), 7),
          key: 'selection'
        }   
    ]);
    const dispatch = useDispatch();
    useEffect(() => {
        let strDate = moment(state[0].startDate).format("YYYY-MM-DD");
        let endDate = moment(state[0].endDate).format("YYYY-MM-DD");
        let payload = {
            startDate:strDate,
            endDate:endDate
        }
        console.log(payload ,state)
        dispatch(setDateRange(payload))
    },[state])
    
    return (
        <DateRangePicker
        onChange={item => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
            direction="horizontal"
           
      />
    )
  
}
