// display item information
// 2 buttons - 1 to go back and 1 to rent
// back button will just push(/rentalpage)
// rent button will put availability = "false"

import React from "react";
import { useParams, useHistory } from "react-router-dom";

const Item = ({ items }) => {
    const history = useHistory();
    const { push } = history;
    let { id } = useParams();

    const backSubmit = () => {
        push("/rentalpage")
    }

    const rentItem = () => {
        // .put to availability
        // waiting for api
    }

    console.log(id);
    console.log(items);
    const currentItem = items.find(el => el.item_id === id); // would use useEffect
    console.log(currentItem);
    return (
        <>
        <p>{currentItem.name}</p>
        <button onClick={backSubmit}>Back</button>
        </>
    )
}

export default Item;