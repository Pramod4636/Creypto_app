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
    
     let currencySymbol = currency=="inr" ? "₹" : currencySymbol=="eur" ? "€ "  : "$"; 
    
const changePage = (page) => {
    setPage(page+1);
    setLoading(true);
}
   const  btns =  new Array(132).fill(1);

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
                  symbol = {i.symbol} 
                  currencySymbol = {currencySymbol}
                  />
                ))}
            }
          </HStack>

          

          <HStack w = {"full"} overflowX = {"auto"} p= {"8"}>
            {
             btns.map( (item,index) => (
                <Button 
                bgColor = {"blackAlpha.900"} 
                color = {"white"}
                onClick = {()=>changePage(index+1)} 
                >
                {index+1}
                </Button>
             ))
             }
             </HStack>
        </>
        }
    </Container>
  );
}



export default Coins
