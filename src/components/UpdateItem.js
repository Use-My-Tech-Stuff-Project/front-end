import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Button, TextField, Card } from "@material-ui/core";
import styled from "styled-components";

const StyledCardOne = styled(Card)`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 25px 35%;
    padding: 25px 0;
`;

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

const UpdateItem = (props) => {
    const { items, user, getItems } = props;
    const initialItemValues = {
        title: "",
        type: "",
        description: "",
        price: 0,
        brand: "",
        model: "",
        imgURL: null,
    }

    const [itemValues, setItemValues] = useState(initialItemValues);
    const [ownedItems, setOwnedItems] = useState([]);
    const { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/items/${id}`)
            .then(res => {
                setItemValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = e => {
        let { name, value } = e.target;
        setItemValues({ ...itemValues, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/api/items/${id}`, itemValues)
            .then(res => {
                console.log(res)
                getItems();
                setOwnedItems(items.filter(item => item.owner === user.id))
                push(`/ownerpage`);
            })
    }

    const handleRemove = e => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`/api/items/${id}`)
            .then(res => {
                console.log(res)
                getItems();
                setOwnedItems(items.filter(item => item.owner === user.id))
                push(`/ownerpage`);
            })
    }

    return (
        <>
            <StyledCard>
                <h1 className="simonText">{itemValues.title}</h1>
                <StyledImg src={itemValues.imgURL} alt="Images unavailable" />
                <p className="simonText">Type: {itemValues.type}</p>
                <p className="simonText">{itemValues.description}</p>
                {itemValues.brand ? <p className="simonText">Brand: {itemValues.brand}</p> : <p className="simonText">Brand: Unavailable</p>}
                {itemValues.model ? <p className="simonText">Model: {itemValues.model}</p> : <p className="simonText">Model: Unavailable</p>}
            </StyledCard>
            <form onSubmit={handleSubmit}>
                <StyledCardOne>
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
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
                    <br></br>
                    <Button variant="contained" color="secondary" onClick={handleRemove}>Remove</Button>
                </StyledCardOne>
            </form>
        </>
    )

}

export default UpdateItem;