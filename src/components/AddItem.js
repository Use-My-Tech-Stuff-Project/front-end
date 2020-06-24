import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

import { Button, TextField, Card } from "@material-ui/core";
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

const AddItem = ({ user, items, getItems }) => {

    const initialItemValues = {
        title: "",
        type: "",
        description: "",
        price: 0,
        brand: "",
        model: "",
        imgURL: "",
        availability: true,
        owner: user.id,
    }

    const [itemValues, setItemValues] = useState(initialItemValues);
    const { push } = useHistory();
    const [ownedItems, setOwnedItems] = useState([]);

    const changeHandler = e => {
        let { name, value } = e.target;
        setItemValues({ ...itemValues, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/api/items`, itemValues)
            .then(res => {
                console.log(res)
                getItems();
                setOwnedItems(items.filter(item => item.owner === user.id))
                push(`/ownerpage`);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <StyledCard>
                <TextField
                    variant="outlined"
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={itemValues.title}
                />
                <br></br>
                <TextField
                    variant="outlined"
                    type="text"
                    name="type"
                    onChange={changeHandler}
                    placeholder="Type"
                    value={itemValues.type}
                />
                <br></br>
                <TextField
                    variant="outlined"
                    type="text"
                    name="description"
                    onChange={changeHandler}
                    placeholder="Description"
                    value={itemValues.description}
                />
                <br></br>
                <TextField
                    variant="outlined"
                    type="text"
                    name="price"
                    onChange={changeHandler}
                    placeholder="Price"
                    value={itemValues.price}
                />
                <br></br>
                <TextField
                    variant="outlined"
                    type="text"
                    name="brand"
                    onChange={changeHandler}
                    placeholder="Brand"
                    value={itemValues.brand}
                />
                <br></br>
                <TextField
                    variant="outlined"
                    type="text"
                    name="model"
                    onChange={changeHandler}
                    placeholder="Model"
                    value={itemValues.model}
                />
                <br></br>
                <TextField
                    variant="outlined"
                    type="text"
                    name="imgURL"
                    onChange={changeHandler}
                    placeholder="Image URL"
                    value={itemValues.imgURL}
                />
                <br></br>

                <Button variant="contained" color="default" onClick={() => push(`/ownerpage`)}>Back</Button>
                <br></br>
                <Button variant="contained" color="primary" onClick={handleSubmit}>Add</Button>
            </StyledCard>
        </form>
    )
}


export default AddItem;