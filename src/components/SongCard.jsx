import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { IoTrash } from 'react-icons/io5'
import { deleteAlbum, deleteArtist, deleteSong, getAllAlbums, getAllArtist, getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { storage } from '../config/firebase.config';
import { deleteObject, ref } from 'firebase/storage';
import { useStateValue } from '../context/StateProvider';
const SongCard = ({datas, index, type}) => {
  const [Delete, setDelete] = useState(false)
  const [{allSongs, allAlbums, allArtists, isSongPlaying, songIndex}, dispatch] = useStateValue();


  const deleteImage = (datas,type) =>{

   
     if(type === "song"){
      deleteSong(datas._id).then((res)=>{
        getAllSongs().then(data =>{
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
      })
      const deleteRef = ref(storage, datas.songURL);
      const deleteRefs = ref(storage, datas.imageURL);
      deleteObject(deleteRef).then(() =>{

      });
      deleteObject(deleteRefs).then(() =>{

      });
    }

    
     if(type === "album"){
      deleteAlbum(datas._id).then((res)=>{
        getAllAlbums().then(data =>{
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.data
        })
      })
      })
      
      const deleteRefs = ref(storage, datas.imageURL);
      deleteObject(deleteRefs).then(() =>{

      });
    }

    
     if(type === "artist"){
      deleteArtist(datas._id).then((res)=>{
        getAllArtist().then(data =>{
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.data
        })
      })
      })
      
      const deleteRefs = ref(storage, datas.imageURL);
  
      deleteObject(deleteRefs).then(() =>{

      });
    }
  }

const addToContext =() =>{
  if(!isSongPlaying){
    dispatch({
      type: actionType.SET_ISSONG_PLAYING,
      isSongPlaying : true
    })
  }

  if(songIndex !== index){
    dispatch({
      type: actionType.SET_SONG_INDEX,
      songIndex :  index 
    })
  }
}

  return (
    <motion.div className='relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center'
    onClick={type ==='song' && addToContext}
    >
      <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
        <motion.img whileHover={{scale: 1.05}} src={datas.imageURL} className='w-full h-full rounded-lg object-cover' />
      </div>

      <p className='text-base text-headingColor font-semibold my-2'>
        {datas.name.length >25 ? `${datas.name.slice(0,25)}..` : datas.name}
        {datas.artist && (<span className='block text-sm text-center text-gray-400 my-1 '>
            {datas.artist.length >25 ? `${datas.artist.slice(0,25)}..` : datas.artist}
            </span>)}

      </p>
      <div className='w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
        <motion.i whileTap={{scale: 0.75}} className='text-base text-red-400 drop-shadow-md hover:text-red-600' onClick={()=> setDelete(true)} >
            <IoTrash />
        </motion.i>
      </div>

     {Delete && (
       <motion.div className='absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0' initial={{opacity: 0}} animate={{ opacity:1}}>
        <p className='text-lg text-headingColor font-semibold text-center'>
          Are you sure do you want to delete it?
        </p>
        <div className='flex items-center gap-4'>
          <motion.button className='px-2 py-1 text-sm uppercase bg-red-300 rounded-md hover:bg-red-500 cursor-pointer' whileTap={{scale: 0.7}} onClick={deleteImage(datas, type)} >
            Yes
          </motion.button>
           <motion.button className='px-2 py-1 text-sm uppercase bg-green-300 rounded-md hover:bg-green-500 cursor-pointer' whileTap={{scale: 0.7}} onClick={()=> setDelete(false)} >
            No
          </motion.button>
        </div>
      </motion.div>
     )}
    </motion.div>
  )
}

export default SongCard
