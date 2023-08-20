import axios from 'axios';
import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Add() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

    const navigate = useNavigate();
    
    const loadImage = (e) => {
        const newImage = e.target.files[0];
        setImage(newImage);
        setPreview(URL.createObjectURL(newImage));
    }

    const adicionarLivro = async (e) => {
        e.preventDefault();
        try{
            if(title.trim().length > 0 && description.trim().length > 0){
                const formData = new FormData();
                formData.append("title", title);
                formData.append("description", description);
                formData.append("image", image);
                await axios.post("http://localhost:4000/books", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                navigate("/");
            }else{
                alert("Preencha todos os campos!");
            }
            
        }catch(err){
            console.log("Erro: " + err);
        }
    } 
    
    return (
        <div>
            <div className='columns is-centered mt-5'>
                <div className='column is-half'>
                    <form onSubmit={adicionarLivro}>
                        <div className='field'>
                            <label className="label">Título</label>
                            <div className='control'>
                            <input className="input" type="text" value={title} 
                            maxLength={100} placeholder='Máx: 100 caracteres'
                            onChange={(e) => setTitle(e.target.value)}>
                            </input>
                            </div>
                        </div>
                        <div className='field'>
                            <label className="label">Descricao</label>
                            <div className='control'>
                            <input className="input" type="text" value={description}
                            maxLength={200} placeholder='Máx: 200 caracteres' 
                            onChange={(e) => setDescription(e.target.value)}>
                            </input>
                            </div>
                        </div>
                        <div className='field'>
                            <label className="label">Imagem</label>
                            <div className='control'>
                                <div className='file'>
                                <label className="file-label">
                                    <input type='file' className='file-input' onChange={loadImage}></input>
                                    <span className='file-cta'>
                                        <span className='file-label'>Escolha uma imagem</span>
                                    </span>
                                </label>
                                </div>
                            </div>
                        </div>
                        {preview ? (
                            <figure className='image is-128x128'>
                                <img src={preview} alt='´review image'></img>
                            </figure>
                        ) : (
                            ""
                        )}
                        <div className='field'>
                            <div className='control'>
                                <button type='submit' className='button is-success' onClick={adicionarLivro}>
                                Adicionar</button>
                            </div>       
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Add