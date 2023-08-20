import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function Update() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
     getProductById();  
    }, []);
    
    const getProductById = async () => {
        const response = await axios.get(`http://localhost:4000/books/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image);
        setPreview(response.data.url)
    }

    const loadImage = (e) => {
        const newImage = e.target.files[0];
        setImage(newImage);
        setPreview(URL.createObjectURL(newImage));
    }

    const atualizarLivro = async (e) => {
        e.preventDefault();
        try{
            if(title.trim().length > 0 && description.trim().length > 0){
                const formData = new FormData();
                formData.append("title", title);
                formData.append("description", description);
                formData.append("image", image);
                await axios.put(`http://localhost:4000/books/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            navigate("/");
            }else{
                alert("Todos os campos devem estar preenchidos!");
            }
        }catch(err){
            console.log("Erro: " + err);
        }
    } 
    
    return (
        <div>
            <div className='columns is-centered mt-5'>
                <div className='column is-half'>
                    <form onSubmit={atualizarLivro}>
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
                                <button type='submit' className='button is-success' onClick={atualizarLivro}>
                                Atualizar</button>
                            </div>       
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Update