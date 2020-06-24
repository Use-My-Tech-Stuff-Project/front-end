import React from "react";
import { useHistory } from "react-router-dom";

import { Card } from "@material-ui/core";
import styled from "styled-components";

const StyledCard = styled(Card)`
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 25px 25px;
    padding: 25px 0;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
`;

const ItemList = ({ items, user }) => {
    const history = useHistory();
    const { push } = history;
    console.log(items);

    const availableItems = items.filter(item => item.availability === true && item.owner !== user.id);

    return (
        <div>
            <h1 className="simonText">Items</h1>
            <StyledDiv>
            {
                availableItems.map(item => {
                    return (
                        <StyledCard onClick={() => push(`/item/${item.id}`)}>
                            <h3 className="simonText">{item.title}</h3>
                        </StyledCard>
                    )
                })
            }
            </StyledDiv>
        </div>
    )
}

export default ItemList;