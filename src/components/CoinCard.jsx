import React from 'react'
import { Text , Heading,Button , HStack , Image , VStack } from '@chakra-ui/react'
import {Link} from "react-router-dom" 
const CoinCard = ({id , img,name,symbol,price,currencySymbol = "₹"})=>
    <>
    <Link to={`/coin/${id}`}  >
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
            {symbol}
        </Heading>
        </VStack>
        <Text noofLines={1}> {name}</Text>
        <Text noofLines={1}> { price ? `${currencySymbol}`:"NA" }</Text>
    </Link>
    
</>

export default CoinCard
