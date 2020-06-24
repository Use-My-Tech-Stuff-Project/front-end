import React from "react";

import ItemList from "./ItemList";

const RentalPage = props => {
    const {user, items} = props;

  return (
    <>
      <ItemList items={items} user={user}/>
    </>
  );
};

export default RentalPage;
