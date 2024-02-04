import React, { useEffect } from 'react'
import { getAllArtist } from '../api';
import { actionType } from '../context/reducer';

import { useStateValue } from '../context/StateProvider';
import SongCard from './SongCard';

const DashboardArtists = () => {
   const [{allArtists}, dispatch] = useStateValue();

  useEffect(() =>{
    if(!allArtists){
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        });
      });
    }
  },[]);
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
       <ArtistContainer data={allArtists} />
    </div>
  )
}

export const ArtistContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-evenly'>
      {data && data.map((song, i) =>(
        <SongCard key={song._id} datas={song} index={i} type="artist" />
      ))}
    </div>
  )
}

export default DashboardArtists
