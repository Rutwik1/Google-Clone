import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://api.scrape-it.cloud/scrape/google';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    setLoading(true);
  
    try {
      const res = await fetch(`${baseUrl}${url}`, {
        method: 'post',
        headers: {
          'x-api-key': process.env.REACT_APP_API_KEY,
          // 'Content-Type': 'application'
        },
      });
  
      if (!res.ok) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
  
      const data = await res.text();
      
  
      if (url.includes('/news')) {
        setResults(data.entries);
      } else if (url.includes('/images')) {
        setResults(data.images_results);
      } else {
        setResults(data.organic_results);
      }
    } catch (error) {
      console.error(error);
    }
  
    setLoading(false);
  };
  
  
  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
