const ResponseStatus = require('../../ReponseStatus')
const server = require('./server')

const  getStatus =async(req,res)=>{
    const rs = await server.getStatusServer(req.params.id)
return res.json(rs)
}


const  getMuiltiStatus =(req,res)=>{
    return res.json("hello")
}

module.exports ={
    getStatus,
    getMuiltiStatus
}