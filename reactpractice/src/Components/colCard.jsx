import React, { useState } from "react";
import  styles  from "../CSS/ColCard.module.css";
export const ColCard = ({ item, booleanCol, setBooleanCol }) => {
    let bool = booleanCol.filter((el) => el.id === item.id);
    const [col, setCol] = useState(bool[0].value);

    const handleClick = (id) => {
        setCol(!col);     
        let newValue = booleanCol.map((el)=>el.id===id?{...el,value:!el.value}:el)
        setBooleanCol(newValue)
    }
    return (    
        <>  
             {
                col?<div className={styles.marker}></div>:<div></div>
             } 
            <div className={styles.box} onClick={()=>handleClick(item.id)}>
                <div>{item.name}</div>
            </div>
        </>
    )
}