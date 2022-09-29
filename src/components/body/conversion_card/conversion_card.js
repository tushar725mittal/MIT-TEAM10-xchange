import React, { Component, useEffect } from "react";
import "./conversion_card.css";
// import Records from './services/json_fetch/currencies_final.json'

function setCurrencyValue() {
  document.getElementById("currency-to-value").value =
    (document.getElementById("currency-from-value").value *
      document.getElementById("currency-from").value) /
    document.getElementById("currency-to").value;
}

function fetchCurrency({}) {
  var currencies = [];
  var currency_json = {}

  return (
    <>
    <option value={currency_json}> </option>
    </>
  )

}
export default function ConversionCard() {
  const [currency_json, setCurrencyJson] = React.useState({});
  useEffect(() => {
    fetch("currencies_final.json").then((json) => {
      json.json().then((data) => {
        setCurrencyJson(data);
        // console.log(data);

      });
    });
  }, []);

  // input.addEventListener('input', setCurrencyValue);
  return (
    <div className="card-container" align="center">
      <div className="text-container-3">
        <h3>CONVERT IT!</h3>
      </div>
      <div className="text-container-1">
        <input
          className="input-field"
          id="currency-from-value"
          type="number"
          placeholder="FROM"
        />
        <select className="currency-selector">
          {/* {
            () => {
              var l = [];
              l.each((key,value ) => {
                var currency = currency_json[key]
                l.append(('<option>',{ value:currency['shortform'], text:currency['shortform']}))

              })}} */}

              <option> USD</option>
            

          
        </select>
      </div>
      <div className="text-container-2">
        <input
          className="input-field"
          type="number"
          id="currency-to-value"
          disabled
          placeholder="TO"
        />
        <select className="currency-selector">
          <option>USD</option>
        </select>
      </div>
    </div>
  );
}
