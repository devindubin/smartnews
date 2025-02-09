import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    rawText: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    sentiment: {
         keywords :{
            type: [String],
        }, ranking: {
            type: Number
        }
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'source'
    }
})

const Article = mongoose.model('article',articleSchema)

export default Article;