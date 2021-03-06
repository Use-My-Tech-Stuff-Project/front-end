import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import { Button, Card } from "@material-ui/core";
import styled from "styled-components";

const StyledCard = styled(Card)`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px 25%;
    padding: 25px;
`;

const StyledImg = styled.img`
    width: 500px;
    height: auto;
`;

const ReturnItem = ({ items, user, getItems }) => {
    const history = useHistory();
    const { push } = history;
    let { id } = useParams();
    const [currentItem, setCurrentItem] = useState(items[0]);

    const backSubmit = e => {
        e.preventDefault();
        push("/ownerpage")
    }

    const returnCurrent = e => {
        e.preventDefault();
        console.log({ ...currentItem, availability: true, renter: null })
        axiosWithAuth()
            .put(`/api/items/${id}`, { ...currentItem, availability: true, renter: null })
            .then(res => {
                console.log(res)
                getItems()
                push("/ownerpage")
            })
            .catch(err => console.log(err))
    }

    console.log(id);

    useEffect(() => {
        axiosWithAuth()
            .get(`https://usemytechstuffapp.herokuapp.com/api/items/${id}`)
            .then(res => {
                console.log(res);
                setCurrentItem(res.data)
            })
    }, [id]);

    console.log(currentItem);

    return (
        <StyledCard>
            <h1 className="simonText">{currentItem.title}</h1>
            <StyledImg src={currentItem.imgURL} alt="Images unavailable" />
            <p className="simonText">Type: {currentItem.type}</p>
            <p className="simonText">{currentItem.description}</p>
            {currentItem.brand ? <p className="simonText">Brand: {currentItem.brand}</p> : <p className="simonText">Brand: Unavailable</p>}
            {currentItem.model ? <p className="simonText">Model: {currentItem.model}</p> : <p className="simonText">Model: Unavailable</p>}
            <Button variant="contained" color="default" onClick={backSubmit}>Back</Button>
            <br></br>
            <Button variant="contained" color="secondary" onClick={returnCurrent}>Return Item</Button>
        </StyledCard>
    )
}

export default ReturnItem;