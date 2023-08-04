import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: "",
    });

    const handleChange = (e) => {
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        if(book.title.trim() === "" || book.description.trim() === "" || book.cover.trim() === ""){
            alert("Preencha todos os campos");
        }else{
            try {
                await axios.post("http://localhost:4000/books", book);
                navigate("/books");
            }catch(err) {
                console.log("Ocurred this error: " + err);
            }
        }

        
    }
    console.log(book)
    return (
        <div className='form'>
            <h2>Adicionar novo livro</h2>
            <input type='text' placeholder='Título' onChange={handleChange} name='title'></input>
            <input type='text' placeholder='Descrição' onChange={handleChange} name='description'></input>
            <input type='text' placeholder='Capa' onChange={handleChange} name='cover'></input>
            <button onClick={handleClick}>Adicionar livro</button>
        </div>
    )
}

export default Add