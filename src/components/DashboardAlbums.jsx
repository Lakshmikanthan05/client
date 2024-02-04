import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllAlbums } from '../api';
import { actionType } from '../context/reducer';
import SongCard from './SongCard';


const DashboardAlbums = () => {
   const [{allAlbums}, dispatch] = useStateValue();

  useEffect(() =>{
    if(!allAlbums){
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        });
      });
    }
  },[]);
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
       <AlbumContainer data={allAlbums} />
    </div>
  )
}

export const AlbumContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song, i) =>(
        <SongCard key={song._id} datas={song} index={i} type="album" />
      ))}
    </div>
  )
}



export default DashboardAlbums
