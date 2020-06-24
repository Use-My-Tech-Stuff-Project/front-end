import React from "react";
import { useHistory } from "react-router-dom";
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

const ItemList = ({ items, user }) => {
    const history = useHistory();
    const { push } = history;
    console.log(items);
    const availableItems = items.filter(item => item.availability === true && item.owner !== user.id);
    return (
        <div>
            <h1>Items</h1>
            {
                availableItems.map(item => {
                    return (
                        <StyledCard onClick={() => push(`/item/${item.id}`)}>
                            <p>{item.title}</p>
                        </StyledCard>
                    )
                })
            }
        </div>
    )
}

export default ItemList;