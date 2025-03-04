import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
});

// Correct way to register the model
const SongModel = mongoose.models.Song || mongoose.model("Song", songSchema);

export default SongModel;
