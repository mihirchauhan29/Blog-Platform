//create post
const postCtrl=async(req,res)=>{
    try {
        res.json({
            status:"success",
            message:"Post created",
        })
        
    } catch (error) {
        res.json(error.message)
    }
}


module.exports={
    postCtrl,
}