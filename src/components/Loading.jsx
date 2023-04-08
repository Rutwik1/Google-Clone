import React from 'react';
// import { Loader } from 'react-loader-spinner';
import { Puff } from  'react-loader-spinner'


export const Loading = () => (
  <div className="flex justify-center items-center ">
<Puff
  height="550"
  width="80"
  radius={1}
  color="#4fa94d"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>  
</div>
);
// export default loading;