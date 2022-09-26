const express = require("express");
app = express()
const routes = require("./routes.js")



app.set('port', process.env.PORT || 3000)

app.get('/', (req,res)=>{

})

app.use('/temp/api', routes)

app.listen(app.get('port'), ()=>{
    console.log(`server running on port ${app.get('port')}`)
})
