import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BsTrash3Fill } from "react-icons/bs";

const ListSong = () => {

const [data,setDta]=useState([]);
const fetchSongs=async()=>{

try {
  const response=await axios.get(`http://localhost:8001/api/song/list`);
  if(response.data.success){
    setDta(response.data.songs)
  }
} catch (error) {
  toast.error("Error Occur")
}

}

const removeSong= async(id)=>{
  try {
    const response=await axios.post(`http://localhost:8001/api/song/remove`,{id})
    if(response.data.success){
      toast.success(response.data.message)
      await fetchSongs();
    }
  } catch (error) {
    toast.error("Error Occur")
    
  }
}



useEffect(()=>{
fetchSongs();
},[])


  return (
    <div>
     <p>All Songs List</p>
     <br />
     <div>
     <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item,index)=>{
          return(
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
               <img className='w-12' src={item.image} alt="" />
               <p>{item.name}</p>
               <p>{item.album}</p>
               <p>{item.duration}</p>
               <p onClick={()=>removeSong(item._id)}><BsTrash3Fill size={17} className="text-black hover:text-red-700 cursor-pointer" /></p>
               
            </div>
          )
        })}
     </div>
    </div>
  )
}

export default ListSong
