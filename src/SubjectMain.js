import React from 'react'
import {useState,useEffect} from 'react'
import Subject from './Subject';
import {Grid} from '@material-ui/core'
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
function SubjectMain() {
    const [subjects,setsubjects]=useState(null);
    const [pages,setPages]=useState(null);
    const [currentPage,setCurrentPage]=useState(1);
    const [currentitems,setCurrentItems]=useState(null);
 useEffect(()=>{
    axios.get('https://nut-case.s3.amazonaws.com/coursessc.json')
   .then((response)=>{
     setsubjects(response.data);
     setPages(Math.round(response.data.length/6));
     
     setCurrentItems(response.data.slice(0,6));
   })
 },[]);
 const handleChange = (event, value) => {
   setCurrentPage(value);
   const startIndex = (value * 6) - 6;
  const endIndex = startIndex + 6;
  const temp= subjects.slice(startIndex, endIndex);
  setCurrentItems(temp);
 };



    return (
        <div>
             <Grid container spacing={3}
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
    {currentitems?currentitems.map(item =>  <Subject data={item} />):null}
   {subjects? <Pagination count={Math.round(subjects.length/6)} page={currentPage} onChange={handleChange} color='primary' style={{margin:'auto'}} />:null}
    </Grid>
        </div>
    )
}

export default SubjectMain
