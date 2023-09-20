import './mainpage.css';
import { useState } from 'react';
<style>
     @import url('https://fonts.googleapis.com/css2?family=Bree+Serif&family=Bubblegum+Sans&family=Carter+One&display=swap');
</style>

const Mainpage = () => {
     const [stockcode, setStockcode] = useState('');
     const [fetchData, setFetchData] = useState(null);
     const [loadingmsg, setLoadingmsg] = useState('');
     const [symbol, setSymbol] = useState(null);
     const handleChange = (e) => {
          setStockcode(e.target.value);
     }

     const handleData = async () => {
          setLoadingmsg('Fetching stock info...');
          try {
               const api_key = 'ck5kpo9r01qls0um8t60ck5kpo9r01qls0um8t6g';
               const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockcode}&token=${api_key}`);

               if (response.ok) {
                    setLoadingmsg('');
                    const data = await response.json();
                    setFetchData(data);
                    setSymbol(stockcode);
               
                    if (fetchData.c == 0){
                         setLoadingmsg('Please enter a VALID STOCK CODE!!');
                         setSymbol(null);}
               }
          }
          catch (error) {
               setLoadingmsg('No such Stock Code exists!!');
               setFetchData(null);
               console.log('error');
          }
     }
     
     return (
          <div className='main'>
               <h1>Stock Tracking Redefined</h1>
               <div className="search">
                    <label htmlFor="searchbox"><h2>Enter the Stock code:</h2></label>
                    <input type="text" id="searchbox" onChange={handleChange} placeholder='Enter stock code' />
               </div>
               <button className="btn" onClick={handleData}>Track stock</button>

               <h6>{loadingmsg}</h6>
               {
               fetchData && symbol &&
                    <div className="fetchedData">
                         <p>Stock code: {symbol}</p>
                         <p>Stock Price: {fetchData.c} <span className='${symbol}'> USD</span></p>
                         <p>Price change: {fetchData.d}<span> USD</span></p>
                         <p>Percent price change: {fetchData.dp}<span>%</span></p>
                         <p>Opened at: {fetchData.o}<span>USD</span> </p>
                         <p>Previous close: {fetchData.pc}<span> USD</span></p>
                         <p>Today's Range: {fetchData.l} - {fetchData.h}</p>
                         <p>Timestamp: {fetchData.t}</p>

                    </div>
               }
          </div>
     );
}

export default Mainpage;