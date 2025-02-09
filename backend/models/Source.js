import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    baseURL: {
        type: String,
        required: true
    },
    
})

const Source = mongoose.model('source',sourceSchema)
export default Source;