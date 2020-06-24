// display item information
// 2 buttons - 1 to go back and 1 to rent
// back button will just push(/rentalpage)
// rent button will put availability = "false"

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

const Item = ({ items, user, getItems }) => {
    const history = useHistory();
    const { push } = history;
    let { id } = useParams();
    const [currentItem, setCurrentItem] = useState(items[0]);

    const backSubmit = e => {
        e.preventDefault();
        push("/rentalpage")
    }

    const rentItem = e => {
        e.preventDefault();
        // .put to availability
        // waiting for api
        console.log({ ...currentItem, availability: false, renter: user.id })
        axiosWithAuth()
            .put(`/api/items/${id}`, { ...currentItem, availability: false, renter: user.id })
            .then(res => {
                console.log(res)
                getItems()
                push("/rentalpage")
            })
            .catch(err => console.log(err))
    }

    console.log(id);
    // const currentItem = items.find(el => el.id === id); // would use useEffect

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
            <Button variant="contained" color="primary" onClick={backSubmit}>Back</Button>
            <br></br>
            <Button variant="contained" color="secondary" onClick={rentItem}>Rent</Button>
        </StyledCard>
    )
}

export default Item;