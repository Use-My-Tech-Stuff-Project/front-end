import React from "react";
import { useHistory } from "react-router-dom";

import OwnedList from "./OwnedList";
import RentedItems from "./RentedItems";

import { Button } from "@material-ui/core";

const OwnerPage = props => {
    const { user, items } = props;
    const history = useHistory();
    const { push } = history;
    console.log(user);

    const addHandle = e => {
        e.preventDefault();
        push(`/additem`);
    }

    return (
        <>
            <h1 className="simonText">{user.message}</h1>
            <Button variant="contained" color="primary" onClick={addHandle}>Add Item</Button>
            <OwnedList user={user} items={items} />
            <RentedItems user={user} items={items} />
        </>
    )
}

export default OwnerPage;