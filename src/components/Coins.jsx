import React , { useState,useEffect } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container } from '@chakra-ui/react';
import Loader from './Loader'
import { Heading,Button , HStack , Image , VStack } from '@chakra-ui/react'
import ErrorComponent from "./ErrorComponent"
import CoinCard from './CoinCard'


const Coins = () => {
    
    const [coins,setCoins] = useState([]);
    const [loading ,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("inr");
    // data is fetched 
    useEffect( ()=>{
        const fetchCoins = async () => {
            try{
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`); 
                console.log(data);
                setCoins(data);
                setLoading(false);
            }
            catch(error){
                setError(true);
                setLoading(false);
            }
        };
        fetchCoins();

    } 
   


    ,[currency,page]);

  if(error ) return <ErrorComponent message="Error while fetching Coins "/>
  return (
    <Container maxW = {"container.xl"}>
        {loading ? <Loader/> :  <>
          
          <HStack wrap={"wrap"}>
            {coins.map( (i) => (
                  <CoinCard
                  id = {i.id}
                  key =  {i.id}
                  name = {i.name}
                  price  ={i.current_price} 
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



export default Coins
