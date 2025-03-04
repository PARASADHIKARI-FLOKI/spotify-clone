import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../assets/assets';
import axios from 'axios';

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('bgColour', colour); // Store as a string, not an array

      const response = await axios.post(`http://localhost:8001/api/album/add`, formData);
      console.log(response.data);

      if (response.data.success) {
        toast.success('Album added successfully!');
        setName('');
        setDescription('');
        setImage(null);
        setColour("#121212"); // Reset to default

      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" accept="image/*" hidden />
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} className="w-24 cursor-pointer" alt="" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here"
          type="text"
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type here"
          type="text"
          required
        />
      </div>
      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input onChange={(e) => setColour(e.target.value)} value={colour} type="color" />
      </div>
      <button type="submit" className="text-base bg-black text-white py-2.5 px-14 cursor-pointer">
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
