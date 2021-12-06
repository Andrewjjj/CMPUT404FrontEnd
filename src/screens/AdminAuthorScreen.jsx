import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export const AdminAuthorScreen = (props) => {
    const [host, setHost] = useState("");
    const [authors, setAuthors] = useState([]);
    const logOut = useStoreActions((state) => state.logOut)
    const navigate = useNavigate()
    const restHost = useStoreState((state) => state.restHost)

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            let response = await axios.get(`${restHost}/authors`);
            let authors = response.data.items;
            console.log(authors);

            setAuthors(authors);
        } catch(err) {
            console.log(err);
            alert(err);
        }
    }

    const deleteAuthorHandler = async (author) => {
        await axios.delete(`${author.id}`);
        alert("success");
        window.location.reload();
    }

    const logOutHandler = () => {
        logOut()
        navigate("/")
    }

    return (
        <div className="container">
            <div  align="center">
                <Button className="Buttons mx-2" onClick={() => {navigate("/Admin")}}>Return to main</Button>
                <Button className="Buttons mx-2" onClick={() => {logOutHandler()}}>Logout</Button>
            </div>
            <div className="row">
                {authors.map((author, i) =>
                    <div>
                        <img className= 'profileImage' src= {author["profileImage"]} alt=""></img>
                        {author.displayName}
                        <Button className="Buttons mx-2" onClick={() => {navigate(`/Admin/Authors/Profile?authorID=${author.id}`)}}>Edit Profile</Button>
                        <Button className="Buttons mx-2" onClick={() => {navigate(`/Admin/Authors/Friends?authorID=${author.id}`)}}>View Friends</Button>
                        <Button className="Buttons mx-2" onClick={() => {deleteAuthorHandler(author)}}>Delete Author</Button>
                    </div>
                )}
            </div>
            <button className= "Buttons mx-2" onClick={() => navigate("/Admin/Authors/Create")}> Add Author </button>
        </div>
    )
}