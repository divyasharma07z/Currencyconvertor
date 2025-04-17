import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates)); 
        setConversionRate(data.rates[toCurrency]); 
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          const rate = data.rates[toCurrency];
          setConversionRate(rate);
          setConvertedAmount((amount * rate).toFixed(2));
        });
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div
      className="  min-h-screen max-w-full bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681580465147-8a2f6a8ecc0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black p-8 rounded-3xl shadow-2xl max-w-lg w-full mx-4 sm:mx-0">
        <h2 className="text-4xl text-center font-extrabold mb-6 text-pink-300 tracking-wide">
          Currency Converter
        </h2>

        <div className="mb-6">
          <label className="block text-lg text-blue-300">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>

        <div className="flex gap-6 mb-6">
          <div className="flex-1">
            <label className="block text-lg bg-cover text-blue-300">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-lg text-blue-300">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {}}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-blue-600 text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-pink-500 transition-all transform hover:scale-105"
        >
          Convert
        </button>

        {convertedAmount && (
          <div className="mt-6 text-xl font-semibold text-center text-blue-300">
            <p>
              <span className="font-bold">{amount} {fromCurrency}</span> ={" "}
              <span className="font-bold">{convertedAmount} {toCurrency}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
