import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const [book, setBook] = useState({
        title: "",
        description: "",
        cover: "",
    });

    useEffect(() => {
        fetchBookDetails();
    }, []);

    const handleChange = (e) => {
        setBook((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const navigate = useNavigate();
    const location = useLocation();
    const idBook = location.pathname.split("/")[2];

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get("http://localhost:4000/books/" + idBook);
            setBook(response.data);
        } catch (err) {
            console.log("Error occurred while fetching book details: " + err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        if(book.title.trim() === "" || book.description.trim() === "" || book.cover.trim() === ""){
            alert("Preencha todos os campos");
        }else{
            try {
                await axios.put("http://localhost:4000/books/" + idBook, book);
                navigate("/books");
            }catch(err) {
                console.log("Ocurred this error: " + err);
            }
        }
    }
    console.log(book)

    return (
        <div className='form'>
            <h2>Atualizar livro</h2>
            <input type='text' placeholder='Título' name='title' value={book.title} onChange={handleChange} required></input>
            <input type='text' placeholder='Descrição' name='description' value={book.description} onChange={handleChange}></input>
            <input type='text' placeholder='Capa' name='cover' value={book.cover} onChange={handleChange}></input>
            <button onClick={handleClick}>Atualizar livro</button>
        </div>
    )
}

export default Update