import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Item from "./Item"

const ItemList = ({ items, user }) => {
    const availableItems = items.filter(item => item.availability === "true" && item.user_id !== user.user_id);
    return (
        <div>
            <h1>Items</h1>
            {
                availableItems.map(item => {
                    return <Link to={`/item/${item.item_id}`}>{item.name}</Link>
                })
            }
        </div>
    )
}

export default ItemList;