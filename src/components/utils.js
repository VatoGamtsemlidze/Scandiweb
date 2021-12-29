import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function renderAttributeList(itemID, attributeName, att, attributeType, attributeID){
    if(attributeID !== "Color"){
        return (
            <li
                key={att?.id}
                onClick={() => this.props.changeAttributeAction(itemID, attributeName, att.id)}
                style={{
                    background: att?.id === attributeType?.id ? "black" : "transparent",
                    color: att?.id === attributeType?.id ? "white" : "black"
                }}
            >
                {att?.value}
            </li>
        );
    }else {
        return (
            <li
                key={att?.id}
                onClick={() => {
                    this.props.changeAttributeAction(itemID, attributeName, att.id)
                }}
                style={{background: `${att?.value}`,border:"none",borderRadius:"5px", width:"5px", height:"20px", display:"flex", justifyContent:"center", alignItems:"center"}}>
                {att?.id === attributeType?.id ?
                    <FontAwesomeIcon
                        color={att.value !== "#FFFFFF" ? "white" : "black"}
                        icon={faCheck}/>
                    : null
                }
            </li>
        );
    }
}
