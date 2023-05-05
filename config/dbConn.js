const mongoose=require('mongoose')

const connectDB = async ()=>{
        await mongoose.connect(process.env.DATABASE_URI, {
           connectTimeoutMS: 5000
        }).catch (err=> console.error(err))
    }


module.exports = connectDB