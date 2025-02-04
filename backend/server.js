import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000


app.get('/',(req,res) => {
    if (req.headers.accept.includes("text/html")){
        res.send('Hello World')
    }else{
    res.json({message: 'Hello World'})
}
})

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})