import Product from "../models/product"
import { productSchema } from "../schemas/schemaProduct"
export const gets = async(req,res)=>{
    try {
        const products = await Product.find()
        if(products.length === 0){
           return res.status(500).json({
                message:"không có sản phẩm nào"
            })
        }else{
            return res.status(200).json({
                message:"sảm phẩm",
                data:products
            })
        }
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const get = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(500).json({
                 message:"không tìm thấy sản phẩm"
             })
         }else{
             return res.status(200).json({
                 message:"sảm phẩm",
                 data:product
             })
         }
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const create = async(req,res)=>{
    try {
        const{error} = productSchema.validate(req.body)
        if(error){
            return res.status(501).json({
                message:error.details[0].message
            })
        }
        const product = await Product.create(req.body)
        if(!product){
            return res.status(500).json({
                 message:"không thể thêm sản phẩm"
             })
         }else{
             return res.status(200).json({
                 message:"thêm sảm phẩm thành công",
                 data:product
             })
         }
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const patch = async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate({_id:req.params.id},req.body,{
            new:true
        })
        if(!product){
            return res.status(500).json({
                 message:"không thể sửa sản phẩm"
             })
         }else{
             return res.status(200).json({
                 message:"sửa sảm phẩm thành công",
                 data:product
             })
         }
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const put = async(req,res)=>{
    try {
        const product = await Product.findByIdAndUpdate({_id:req.params.id},req.body,{
            new:true
        })
        if(!product){
            return res.status(500).json({
                 message:"không thể sửa sản phẩm"
             })
         }else{
             return res.status(200).json({
                 message:"sửa sảm phẩm thành công",
                 data:product
             })
         }
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}
export const remove = async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete({_id:req.params.id})
        if(!product){
            return res.status(500).json({
                 message:"không thể xóa sản phẩm"
             })
         }else{
             return res.status(200).json({
                 message:"xóa sảm phẩm thành công",
                 data:product
             })
         }
    } catch (error) {
        return res.status(400).json({
            message:error
        })
    }
}


