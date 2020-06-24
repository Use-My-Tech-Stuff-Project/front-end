import React from "react";
import { useHistory } from "react-router-dom";

import ItemList from "./ItemList";

const RentalPage = props => {
  const history = useHistory();
  const { push } = history;
  const { user, items } = props;

  return (
    <>
      {
        user ? <ItemList items={items} user={user} /> : push("/login")
      }
    </>
  );
};

export default RentalPage;
