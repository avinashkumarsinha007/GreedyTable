import React from "react";
import { useSelector } from "react-redux";
import styles from "../CSS/Table.module.css";
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TableHead = ({item,i,handleSorting,handleOpenFilter}) => {
    const booleanColumn = useSelector((state) => state.app.booleanColumn);

    return (
        <>
            {booleanColumn[i].value ? <div className="col">
            <div onClick={()=>handleOpenFilter(item)} className={styles.filterIcon}> <FontAwesomeIcon icon={faFilter} /></div>
            <span onClick={()=>handleSorting(item.id)} className={styles.header}>{item.name}</span>           
            </div> : null}
        </>
    )
}