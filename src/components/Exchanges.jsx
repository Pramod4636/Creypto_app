import React , { useState,useEffect } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container } from '@chakra-ui/react';
import Loader from './Loader'
import { HStack } from '@chakra-ui/react';

const Exchanges = () => {
    
    const [exchanges,setExchanges] = useState([]);
    const [loading ,setLoading] = useState(true);

    // data is fetched 
    useEffect( ()=>{
        const fetchExchange = async () => {
            const {data} = await axios.get(`${server}/exchanges?per_page=250`); 
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
          
          <Hstack>
            {
                exchanges.map( (i) => 
                {

                })
            }
          </Hstack>
        </>}
    </Container>
  );
}

export default Exchanges
