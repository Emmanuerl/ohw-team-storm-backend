module.exports = (req,res,result)=>{
    switch (result.code) {
        case 0:
           return res.status(404).send(result)
            break;
        case 1:
          return  res.status(200).send(result)
            break;
        case -1:
          return  res.status(400).send(result)
        break;
        case -2:
         return  res.status(500).send(result) 
    
        default:
         return   res.status(500).send(result)
            break;
    }
}