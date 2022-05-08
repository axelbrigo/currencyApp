import { useEffect, useState } from 'react';
import './App.css';
import Currencies from './components/Currencies';

const URL = 'https://open.er-api.com/v6/latest'


function App() {
  const [currencyOptions, setCurrencyOptions] =useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(27)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount 
  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


  useEffect(() => {
      fetch(URL)
        .then(res => res.json())
        .then(data =>{
         const firstCurrency = Object.keys(data.rates)[37]
          setCurrencyOptions([data.base_code, ...Object.keys(data.rates)])
          setFromCurrency(data.base_code)
          setToCurrency(firstCurrency)?.toFixed(3)
          setExchangeRate(data.rates[firstCurrency])
          console.log(data)
        })
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
      fetch(`${URL}?base=${fromCurrency}$symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  },[fromCurrency, toCurrency])

  function handleFromAmountChange(e) {

    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  

  return (
    
    <div className="App">
      <div className='container__titte'>
      <h1 className='t-stroke t-shadow'>CURRENCY CONVERTER</h1>
      </div>
      <div className='section__currencies'>
      <Currencies
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <Currencies
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
        />
      </div>
        
    </div>
  );
}

export default App;
