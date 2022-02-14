import React, { useState } from "react";
import styles from "../CSS/ColCard.module.css";

export const Filter = ({ handleFilter,handleCloseFilter,resetFilter,filterName }) => {
    const [editedText, setEditedText] = useState("");

    const handleFilerText = (e) => {
        setEditedText(e.target.value);
    }
    const handleFilterButton = ()=>{
        handleFilter(editedText);
        setEditedText("")
    }
    return (
        <>
            <input type="text" placeholder="Input value is case sensitive" className={styles.input} value={editedText} onChange={handleFilerText} />
            <button className={styles.button} onClick={() => handleFilterButton()}>Filter</button>
            <button className={styles.button} onClick={handleCloseFilter}>close Filter</button>
            <button className={styles.button} onClick={resetFilter}>Reset Filter</button><br />
            <div className={styles.text} >You are at {filterName} filter</div>
            <div style={{fontSize:"12px"}}>Note: Please enter two values separated by "-" if you want to filter number column(123-130). </div>
        </>
    )
}