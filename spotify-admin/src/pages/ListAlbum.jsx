import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsTrash3Fill } from "react-icons/bs";

const ListAlbum = () => {
  const [data, setData] = useState([]);
  const [colorChanges, setColorChanges] = useState({});

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`http://localhost:8001/api/album/list`);
      if (response.data.success) setData(response.data.albums);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8001/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const updateAlbumColor = async (id) => {
    try {
      const newColor = colorChanges[id];
      if (!newColor) return;

      const response = await axios.post(`http://localhost:8001/api/album/update`, {
        id,
        bgColour: newColor
      });

      if (response.data.success) {
        toast.success("Color updated successfully!");
        setData((prevData) =>
          prevData.map((album) =>
            album._id === id ? { ...album, bgColour: newColor } : album
          )
        );
        setColorChanges((prev) => {
          const updated = { ...prev };
          delete updated[id];
          return updated;
        });
      }
    } catch (error) {
      toast.error("Error updating color");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
            <img className="w-12" src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.description}</p>
            <div className=" mr-36 flex flex-col items-center">
              <input
                type="color"
                value={colorChanges[item._id] || item.bgColour}
                onChange={(e) => setColorChanges({ ...colorChanges, [item._id]: e.target.value })}
              />
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => updateAlbumColor(item._id)}
              >
                Save
              </button>
            </div>
            <p onClick={() => removeAlbum(item._id)}>
              <BsTrash3Fill size={17} className="text-black hover:text-red-700 cursor-pointer" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
