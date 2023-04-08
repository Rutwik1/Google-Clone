import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'http://api.serpstack.com/search';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    setLoading(true);
  
    try {
      const res = await fetch(`${baseUrl}/${url}`, {
        method: 'GET',
        headers: {
          'access_key': process.env.REACT_APP_API_KEY,
          'query' : 'mcdonalds',  
              },
      });
  
      if (res.status !== 200) {
        throw new Error(`Unexpected response status: ${res.status}`);
      }
  
      const data = await res.json();
  
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
