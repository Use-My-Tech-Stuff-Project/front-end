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


const OwnedList = ({ user, items }) => {
    const history = useHistory();
    const { push } = history;
    const [ownedItems, setOwnedItems] = useState([]);
    
    useEffect(() => {
        setOwnedItems(items.filter(item => item.owner === user.id))
    }, [items])

    console.log(items);
    console.log(ownedItems)
    
    return (
        <div>
            <h1 className="simonText">My Listings</h1>
            {
                ownedItems.map(it => {
                    return (
                        <StyledCard onClick={() => push(`/updateItem/${it.id}`)}>
                            <h3 className="simonText">{it.title}</h3>
                        </StyledCard>
                    )
                })
            }
        </div>
    )
}

export default OwnedList;