import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
          {Array.isArray(albumsData) && albumsData.length > 0 ? (
            albumsData.map((item, index) => (
              <AlbumItem
                key={index}
                image={item.image}
                name={item.name}
                description={item.description}
                id={item._id}
              />
            ))
          ) : (
            <p>Loading albums...</p> 
          )}
        </div>
      </div>

      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's Biggest Hits</h1>
        <div className='flex overflow-auto'>
          {Array.isArray(songsData) && songsData.length > 0 ? (
            songsData.map((item, index) => (
              <SongItem
                key={index}
                image={item.image}
                name={item.name}
                description={item.description}
                id={item._id}
              />
            ))
          ) : (
            <p>Loading songs...</p> // Fallback in case songsData is empty
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
