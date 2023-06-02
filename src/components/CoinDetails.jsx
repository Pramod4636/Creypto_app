import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../index";
//import Chart from "./Chart";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";


const CoinDetails = () => {
 
 const params = useParams();
 const [coin, setCoin] = useState({});
 const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
    const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

   useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        console.log(data)
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);


  if (error) return <ErrorComponent message={"Error While Fetching Coin"} />;

  return (
    <div>
      <h2>COinDetials </h2>
    </div>
  )
}

export default CoinDetails
