import mongoose  from "mongoose";


// *A Schema is the blueprint or structure of a MongoDB collection document.
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
}, {
        timestamps:true  //createdAt, updatedAt
})


//* It’s the actual object you use to interact with the MongoDB collection
const Product = mongoose.model('Product', productSchema)

export default Product
