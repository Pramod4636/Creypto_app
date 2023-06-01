import React , { useEffect } from 'react'
import axios from 'axios'
import {server} from '../index'

const Exchanges = () => {
 
    useEffect( ()=>{
       
       
        const fetchExchange = async () => {
            const {data} = await axios.get(`${server}/exchanges`); 
            console.log(data);
        
        };
        fetchExchange();
    } 
    ,[]);


  return (
    <div>
      Exchanges
    </div>
  );
}

export default Exchanges
