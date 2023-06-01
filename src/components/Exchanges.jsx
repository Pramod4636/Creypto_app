import React , { useState,useEffect } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container } from '@chakra-ui/react';
import Loader from './Loader'
import { Heading,Button , HStack , Image , VStack } from '@chakra-ui/react'

const Exchanges = () => {
    
    const [exchanges,setExchanges] = useState([]);
    const [loading ,setLoading] = useState(true);

    // data is fetched 
    useEffect( ()=>{
        const fetchExchange = async () => {
            const {data} = await axios.get(`${server}/exchanges?per_page=100`); 
            console.log(data);
            setExchanges(data);
            setLoading(false);
        };
        fetchExchange();
    } 
   


    ,[]);


  return (
    <Container maxW = {"container.xl"}>
        {loading ? <Loader/> :  <>
          
          <HStack wrap={"wrap"}>
            {exchanges.map( (i) => (
                  <ExchangeCard
                  key =  {i.id}
                  name = {i.name} 
                  img = {i.image} 
                  rank = {i.trust_score_rank} 
                  url ={i.url} 
                  />
                ))}
            }
          </HStack>
        </>
        }
    </Container>
  );
}

const ExchangeCard = ({name,img,rank,url})=>
    <>
    <a href={url} target ={"blank"}>
        <VStack> 
             <Image 
             src ={img} 
             w={"10"} 
             h={"10"} 
             objectFit = {"contain"}
             alt = {"Exchange"}
             />
        <Heading size = "md" noofLines ={1} >
            {rank}
        </Heading>
        </VStack>

    </a>
    
</>

export default Exchanges
