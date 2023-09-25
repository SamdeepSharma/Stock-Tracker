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
               const api_key1 = 'ck677l1r01qqsl3265v0ck677l1r01qqsl3265vg';
               const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockcode}&token=${api_key1}`);

               if (response.ok) {
                    setLoadingmsg('');
                    const data = await response.json();
                    setFetchData(data);
                    setSymbol(stockcode);
               }
               else {
                    const api_key2 = 'ck5kpo9r01qls0um8t60ck5kpo9r01qls0um8t6g';
                    const nresponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockcode}&token=${api_key2}`);
                    
                    if (nresponse.ok) {
                         setLoadingmsg('');
                         const data = await nresponse.json();
                         setFetchData(data);
                         setSymbol(stockcode);
                    }
               }
          }
          catch (error) {
               setLoadingmsg('Page is temporarily down :(');
               setFetchData(null);
               console.log(error);
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
                    fetchData && symbol && fetchData.d!=null && fetchData.d<0 &&
                    <div className="fetchedData">
                         <p>Stock code: <span>{symbol}</span></p>
                         <p>Stock Price: <span>{fetchData.c} USD</span></p>
                         <p>Price change: <span>{fetchData.d} USD</span></p>
                         <p>Percent price change: <span>{fetchData.dp}%</span></p>
                         <p>Opened at: <span>{fetchData.o} USD</span></p>
                         <p>Previous close: <span>{fetchData.pc} USD</span></p>
                         <p>Today's Range: <span>{fetchData.l} - {fetchData.h}</span></p>
                         <p>Timestamp: <span>{fetchData.t}</span></p>
                         <br />
                         <hr />
                    </div>
               }
               {
                    fetchData && symbol && fetchData.d!=null && fetchData.d>=0 &&
                    <div className="fetchedData fetchedDataP">
                         <p>Stock code: <span>{symbol}</span></p>
                         <p>Stock Price: <span>{fetchData.c} USD</span></p>
                         <p>Price change: <span>{fetchData.d} USD</span></p>
                         <p>Percent price change: <span>{fetchData.dp}%</span></p>
                         <p>Opened at: <span>{fetchData.o} USD</span></p>
                         <p>Previous close: <span>{fetchData.pc} USD</span></p>
                         <p>Today's Range: <span>{fetchData.l} - {fetchData.h}</span></p>
                         <p>Timestamp: <span>{fetchData.t}</span></p>
                         <br />
                         <hr />
                    </div>
               }
               {
                    fetchData && (!symbol) && 
                    <div className="fetchedData">
                         <p>Please enter a STOCK CODE!!</p>
                    </div>
               }
               {
                    fetchData && symbol && (!fetchData.t) &&
                    <div className="fetchedData">
                         <p> '{symbol}' STOCK CODE DOES NOT EXIST!!</p>
                         <p> Please enter a VALID STOCK CODE!!</p>
                    </div>
               }
          </div>
     );
}

export default Mainpage;