import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import ItemList from "./ItemList";

const RentalPage = props => {
    const {user, items} = props;
//   const [items, setItems] = useState([]);

//   const getAllItems = () => {
//     axiosWithAuth()
//         .get("/api/items")
//         .then(res => setItems(res.data))
//         .catch(err => console.log(err))
// }

//   useEffect(() => {
//     getAllItems();
// }, [])

  return (
    <>
      <ItemList items={items} user={user}/>
      {/* <p>test</p>
      <p>{user.username}</p>
      <p>{items[0].name}</p> */}
    </>
  );
};

export default RentalPage;
