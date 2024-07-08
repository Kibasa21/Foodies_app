'use client';

import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();//Isso servirá para reiniciar a página quando uma nova imagem for escolhida e ela aparecer na tela
    const imageInputRef = useRef();

    function handlePickClick() {
        imageInputRef.current.click(); // This will trigger the file picker dialog
    }

    function handleImageChange(event) {//o evento é passado automaticamente pelo React, é nele que a imagem é pega
        const file = event.target.files[0];//o arquivo é pego do evento

        if(!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();//O FileReader é uma API do JavaScript que permite que o navegador leia arquivos (ou blobs) de um computador ou rede
        
        fileReader.onload = () => {//O onload é um evento que ocorre quando um objeto é carregado, já que o readAsDataURL é assíncrono e não resulta em um valor de retorno, é necessário usar o onload para saber quando o arquivo foi lido
            setPickedImage(fileReader.result);//fileReader.result é o conteúdo do arquivo que foi lido
        }
        
        fileReader.readAsDataURL(file);//readAsDataURL é um método do FileReader que lê o conteúdo do arquivo especificado e retorna um URL que representa os dados do arquivo
        //console.log(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>{/* htmlFor is used to associate the label with the input */}
            <div className={classes.control}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='The image selected by the user' fill />}{/* The fill prop is used to make the image fill the container, when you don't know the size of the image yet */}
                </div>
                <input
                    ref={imageInputRef}
                    className={classes.input}
                    type="file" id={name}
                    accept="image/jpeg,image/png"
                    name={name}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type='button' onClick={handlePickClick}>Pick an Image</button> {/* type='button' is used to prevent the form from submitting */}
            </div>
        </div>
    );
}