// import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-web-search1.p.rapidapi.com/';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (type) => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`${baseUrl}${type}`, {
        method: 'GET',
        headers: {
          // 'X-User-Agent': 'desktop',
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'google-web-search1.p.rapidapi.com'
              },
      });
  
      // if (response.status !== 200) {
      //   throw new Error(`Unexpected response status: ${res.status}`);
      // }
  
      const data = await response.json();
  
      if (type.includes('/news')) {
        setResults(data.entries);
      } else if (type.includes('/images')) {
        setResults(data.images_results);
      } else {
        setResults(data.organic_results);
      }
    } catch (error) {
      console.error(error);
    }
    
    setIsLoading(false);
  };
  
  
  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
