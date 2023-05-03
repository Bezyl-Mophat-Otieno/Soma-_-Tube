import React from 'react'
import styled from 'styled-components'
import { Card } from '@mui/material';
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';


const Container = styled.div`
  flex: 2;
`;
function Recomendation({tags}) {
    const [videos , setVideos] = useState([])
    
    useEffect(()=>{
     const fetchRelatedVideos = async ()=>{
        const res = await axios.get(`/videos/tags?tags=${tags}`)
        setVideos(res.data)



     }
    fetchRelatedVideos()
    },[tags])
    return (
    <container>
        {
            videos.map((video)=>{
                return <Card type="sm" key={video._id} video={video}/>
            })
        }

    </container>
  )
}

export default Recomendation