import React, { useState } from "react";
import { ColCard } from "./colCard";
import { useDispatch, useSelector } from "react-redux";
import { setColumn } from "../Redux/action";
import  styles  from "../CSS/ColCard.module.css";

export const Setting = ({data,handleHideSetting}) => {
  const booleanColumn = useSelector((state) => state.app.booleanColumn);
  const [booleanCol, setBooleanCol] = useState(booleanColumn);

  const dispatch = useDispatch();
    const handleSave = () => {
    dispatch(setColumn(booleanCol));
    }
  return (
      <div className={styles.container}>
          <h5>Dimensions and Metrics</h5>
                        <div className={styles.outer}>
                        {data.map((el) => {
                            return (
                            <ColCard
                              key={el.id}
                              item={el}
                              setBooleanCol={setBooleanCol}
                              booleanCol={booleanCol}
                            />
                          );
                        })}
                      </div>
    
      <div className={styles.footer }>
              <button className={styles.button} onClick={handleHideSetting}>Close</button>
              <button className={styles.button} onClick={handleSave}>save changes</button>              
      </div>
    </div>
  );
};

