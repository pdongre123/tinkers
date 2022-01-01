
import './App.css';

import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';

function App() {

  const [HttpRequest,setRequest]= useState([]);


  useEffect( ()=>{
    const getRequest =async()=>{
      const res=await fetch('https://api.pokemontcg.io/v2/cards?page=1&pageSize=10');

      const data=await res.json();

      const total=res.headers.get('x-total-count');
      console.log(total);

      setRequest(data);
    };
    getRequest();
    
    
  }, []);

  console.log(HttpRequest);


const fetchRequest= async(currentPage)=>{
  const res=await fetch('https://api.pokemontcg.io/v2/cards?page=${currentPage}&pageSize=10');

  const data= await res.json();
  return data;
};

const handlePageClick = async (data)=>{
    console.log(data.selected);

        let currentPage=data.selected+1;

       const commentsFormServer=await fetchRequest(currentPage);
       setRequest(commentsFormServer);

}

  return (
    <div > 

<div className='row m-2'>

{HttpRequest.map((HttpRequest)=>{
    return <div key={HttpRequest.id} className='col-sm-6 col-md-4 v my-2'>
           <div className="card shadow-sm w-100" style={{minHeight:225}}>
           <div className='cardbody'>
           <h5 className='card-title text-center h2'>Id:{HttpRequest.id}</h5>
           <h6 className='card-subtitle mb-2 text-muted text-center'>{HttpRequest.name}</h6>
           <p className='card-text'>{HttpRequest.data}</p>
           </div>
           </div>
           </div>;

  })}
  </div>
      
      <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel='......'
      pageCount={15}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName='pagination justify-content-center'
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      activeClassName='active'
      />
    </div>
  );
}

export default App;
