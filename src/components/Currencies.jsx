import React from 'react'
import '../components/currencies.css'

function Currencies(props) {
const{
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount
} = props


  return (
    <>
    <div className='section__exchange'>
      <input onChange={onChangeAmount} type="number" value={amount}  />
      <select onChange={onChangeCurrency} value={selectedCurrency} >
        {currencyOptions.map((option) => (
          <option className='pepino' key={option} value={option}> {option} </option>
        ))}
          
      </select>
    </div>
    
    </>
  )
}

export default Currencies