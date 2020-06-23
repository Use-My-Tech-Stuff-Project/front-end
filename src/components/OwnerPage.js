// edit profile
// list of my items --> filter userid === item.userid

import React from "react";

const OwnerPage = props => {
    const {user, items} = props;
    // edit profile is a button onclick would push me to a route that has an EditProfile component
    // EditProfile will have a form that will be axios.put

    // useEffect for items which will be filtered for user.userid === item.userid
    // then make a list using that
    // each item will be clickable to a link that will have an edit button
    // there will be an EditItem component which will have a put request.
}

export default OwnerPage;