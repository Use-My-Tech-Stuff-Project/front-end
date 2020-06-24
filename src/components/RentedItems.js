import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { Card } from "@material-ui/core";
import styled from "styled-components";

const StyledCard = styled(Card)`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 25px 35%;
    padding: 25px 0;
`;

const RentedList = ({ user, items }) => {
    const history = useHistory();
    const { push } = history;
    const [rentedItems, setRentedItems] = useState([]);
    useEffect(() => {
        setRentedItems(items.filter(item => item.renter === user.id))
    }, [items])
    console.log(items);
    console.log(rentedItems)
    return (
        <div>
            <h2>Rented Items</h2>
            {
                rentedItems.map(it => {
                    return (
                        <StyledCard onClick={() => push(`/rentedItem/${it.id}`)}>
                            <p>{it.title}</p>
                        </StyledCard>
                    )
                })
            }
        </div>
    )
}

export default RentedList;