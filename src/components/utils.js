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
    } else {
        return (
            <li
                key={att?.id}
                onClick={() => {
                    this.props.changeAttributeAction(itemID, attributeName, att.id)
                }}
                style={{background: `${att?.value}`,border:att.value ==="#FFFFFF" ? "1px solid lightgray" : "none",borderRadius:"5px", width:"5px", height:"20px", display:"flex", justifyContent:"center", alignItems:"center"}}>
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
export function attributeToPassFinder(attributeArray,attribute) {
    const attributeToPass = attributeArray.map((attr => {
        return typeof attr !== undefined && attr?.name === attribute.id ? attr : null
    })).find(attr => attr !== null)
    return attributeToPass;
}
export function currencyAmountTracker(currency, product){
    switch (currency){
        case "$":
            return product?.prices[0].amount
        case "£":
            return product?.prices[1].amount
        default:
            return product?.prices[3].amount
    }
}