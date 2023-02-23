import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

export const Meme = () => {

    const [memes, setMemes] = useState([])
    const [memeIndex, setMemeIndex] = useState(0)
    const [captions, setCaptions] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(res => res.json().then(res => {
         const _memes = res.data.memes
         shuffleMemes(_memes)
         setMemes(_memes)
         console.log(_memes)
        }))
    },[])

    useEffect(() => {
        if(memes.length) {
            setCaptions(Array(memes[memeIndex].box_count).fill(''))
        }

    },[memeIndex, memes])

    useEffect(() => {
        console.log(captions)
    }, [captions])

    const changeMeme = () => {
        setMemeIndex(memeIndex + 1)
    }

    const generateMeme = () => {
        console.log("Generated !")

        const currentMeme = memes[memeIndex]
        const formData = new FormData()

        formData.append('username' , 'raaulc')
        formData.append('password', 'Rahul@123')
        formData.append('template_id', currentMeme.id)

        captions.forEach((c, index) => formData.append(`boxes[${index}][text]`,c))

        fetch('https://api.imgflip.com/caption_image', {
            method: 'POST',
            body: formData
        }).then(res => {
            res.json().then(res => {
                navigate(`/generated?url=${res.data.url}`);
            })
        })
    }

    const shuffleMemes = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    const updateCaption = (e, index) => {
        const text = e.target.value || ''

        setCaptions(
            captions.map((c,i) => {
                if (index === i) {
                    return text
                } else {
                    return c
                }
            })
        )
    }

    return (
        memes.length ? 
        <div className= {styles.container}>
            <button onClick={generateMeme}
            className= {styles.generate}>Generate</button>

            <button onClick={changeMeme}
            className= {styles.next}>Next</button>

            {
                captions.map((c,index) => (
                    <input onChange = {(e) => updateCaption(e, index)} key={index}/>
                ))
            }

            <img src= {memes[memeIndex].url}/>
        </div> : 
        <> </>
    );
  }