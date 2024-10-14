import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setData, setStatus } from '../Slices/apiStatusSlice';
import PageLoaders from '../Loaders/PageLoaders';

function AssignRole() {
  const {status,data}=useSelector(state=>state.loader);
  const dispatch=useDispatch();
  async function fetchRoleTOAssign(){
    try {
      let resp=await axios.get("http://localhost:3000/api/admin/assignstaff",{withCredentials:true})
      if(resp){
        dispatch(setData(resp?.data?.staffData))
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(error?.msg))
    }
  }
  useEffect(()=>{
    fetchRoleTOAssign()
  },[])
  if(status==="loading") return <div className='h-[70vh] flex justify-center items-center'><PageLoaders/></div>
  
  return (
    <div>
      {data && data?.map((val)=>{
        console.log(val);
        
        return <div key={val.id}>
            <p>{val.name}</p>
            <p>{val.email}</p>
            <p>{val.restaurant}</p>
            <p>{val.approved}</p>
        </div>
      })}
    </div>
  )
}

export default AssignRole
