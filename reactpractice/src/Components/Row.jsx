import React from "react";
import { useSelector } from "react-redux";

export const Row = ({item}) => {
    const booleanColumn = useSelector((state) => state.app.booleanColumn);

    return (      
            <div className="row bd-highlight" style={{borderBottom:"1px solid silver",paddingBottom:"2px"}}>
                {/* <div className="col">{item.app_id}</div> */}
                {booleanColumn[0].value?<div className="col">{ item.strDate}</div>:null}
                {booleanColumn[1].value ? <div className="col">{item.app_name }</div>:null}
                {booleanColumn[2].value ? <div className="col">{ item.clicks}</div>:null}
                {booleanColumn[3].value ?<div className="col">{item.requests}</div>:null}
                {booleanColumn[4].value ?<div className="col">{item.responses}</div>:null}
                {booleanColumn[5].value ?<div className="col">{item.impressions }</div>:null}
                {booleanColumn[6].value ?<div className="col">{"$ " }{item.revenue}</div>:null}
                {booleanColumn[7].value ? <div className="col">{item.fillRate}{" %"} </div>:null}
                {booleanColumn[8].value ?<div className="col">{item.ctr}{" %"}</div>:null}
            </div>       
    )
}