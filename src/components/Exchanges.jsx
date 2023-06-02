import React , { useState,useEffect } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container } from '@chakra-ui/react';
import Loader from './Loader'
import { Text ,Heading,Button , HStack , Image , VStack } from '@chakra-ui/react'
import ErrorComponent from "./ErrorComponent"
import Footer from "./Footer"


const Exchanges = () => {
    
    const [exchanges,setExchanges] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [error,setError] = useState(false);
    // data is fetched 
    useEffect( ()=>{
        const fetchExchange = async () => {
            try{
                const {data} = await axios.get(`${server}/exchanges?per_page=100`); 
                console.log(data);
                setExchanges(data);
                setLoading(false);
            }
            catch(error){
                setError(true);
                setLoading(false);
            }
        };
        fetchExchange();

    } 
   


    ,[]);

  if(error ) return <ErrorComponent message="Error while fetching exchanges "/>
  return (
    <Container maxW = {"container.xl"}>
        {loading ? <Loader/> :  <>
          
          <HStack wrap={"wrap"} justifyContent = {"space-evenly"}>
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
        <Footer></Footer>
    </Container>
  );
}

const ExchangeCard = ({name,img,rank,url})=>
    <>
    <a href={url} target ={"blank"}>
        <VStack w = {"52"} shadow = {"lg"} p = {"8"} borderRadius={"lg"} transition={"all 0.3s"}
        m = {"4"}
        css = {{
            "&:hover" : { transform : "scale(1.1)"}
        }}
        > 
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

        <Text noofLines = {1}>{name}</Text>

        </VStack>

    </a>
    
</>

export default Exchanges
