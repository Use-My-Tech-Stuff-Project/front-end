// edit profile
// list of my items --> filter userid === item.userid

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
    // edit profile is a button onclick would push me to a route that has an EditProfile component
    // EditProfile will have a form that will be axios.put
    // const editProfile = e => {
    //     e.preventDefault();
    //     push(`/editprofile`);
    // }

    const addHandle = e => {
        e.preventDefault();
        push(`/additem`);
    }

    // useEffect for items which will be filtered for user.userid === item.userid
    // then make a list using that
    // each item will be clickable to a link that will have an edit button
    // there will be an EditItem component which will have a put request.

    return (
        <>
            <h1 className="simonText">{user.message}</h1>
            <Button variant="contained" color="primary" onClick={addHandle}>Add Item</Button>
            {/* <button onClick={editProfile}>Edit Profile</button> */}
            {
                // edit profile isnt possible with API 
            }
            <OwnedList user={user} items={items} />
            <RentedItems user={user} items={items} />
        </>
    )
}

export default OwnerPage;