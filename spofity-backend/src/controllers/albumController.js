import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const bgColour = req.body.bgColour;
        const imageFile = req.file;
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        const albumData = {
            name,
            description,
            bgColour,
            image: imageUpload.secure_url,
        };

        const album = new albumModel(albumData);
        await album.save();
        res.json({ success: true, message: 'Album added successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find();
        res.json({ success: true, albums: allAlbums });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Album removed successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const updateAlbumColor = async (req, res) => {
    try {
        const { id, bgColour } = req.body;

        // Ensure the album exists before updating
        const album = await albumModel.findById(id);
        if (!album) {
            return res.json({ success: false, message: 'Album not found' });
        }

        album.bgColour = bgColour;
        await album.save();

        res.json({ success: true, message: 'Album color updated successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export { addAlbum, listAlbum, removeAlbum, updateAlbumColor };



