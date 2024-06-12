const axios = require("axios");

const apiProducts = async (req, res)=>{
    const getProducts = await axios.get("http://localhost:3000/products")
    const products = getProducts.data; 
    res.json(products)
}

const apiCategories = async (req, res)=>{
    const getCategories = await axios.get("http://localhost:3000/categories")
    const categories = getCategories.data; 
    res.json(categories)
}

const apiUsers = async (req, res)=>{
    const getCategories = await axios.get("http://localhost:3000/users")
    const categories = getCategories.data; 
    res.json(categories)
}
const apiOrder = async (req, res)=>{
    const { user_id, status } = req.query;
    const response = await axios.get(`http://localhost:3000/order?user_id=${user_id}&status=${status}`);
    res.json(response.data[0]); // Assuming only one pending order per user
}

const apiOrderPost = async (req, res)=>{
    const newOrder = req.body;
    const response = await axios.post("http://localhost:3000/order", newOrder);
    res.json(response.data);
}

const apiOrderID = async (req, res)=>{
    const updatedOrder = req.body;
    const { id } = req.params;
    const response = await axios.put(`http://localhost:3000/orderid=${id}`, updatedOrder);
    res.json(response.data);
}


const apiOrder_Detail = async (req, res)=>{
    const { order_id , products } = req.body
    try {
        const newOrderDetail = {
            order_id: order_id,
            products: products
        }
        const response = await axios.post("http://localhost:3000/order_detail", newOrderDetail)
        res.status(201).json(response.data);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order detail' });
    }

}
const apiComments = async (req, res)=>{
    const getCategories = await axios.get("http://localhost:3000/comments")
    const categories = getCategories.data; 
    res.json(categories)
}

module.exports = {
    apiProducts,
    apiCategories,
    apiUsers,
    apiOrder,
    apiOrder_Detail,
    apiComments,
    apiOrderPost,
    apiOrderID
}