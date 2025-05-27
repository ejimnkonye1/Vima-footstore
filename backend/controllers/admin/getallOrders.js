const  Order = require("../../models/Order")



const handlegetOrders = async (req, res) => {
 


    try {
        const orders = await Order.find()
     if(!orders|| orders.length === 0) {
            return res.status(204).json({"message": "No order found"});
        }
             let totalItems = 0;
            let totalRevenue = 0;
            //total items by quantity
        orders.forEach(order => {
            order.items.forEach(item => {
                totalItems += item.quantity;
            });
             totalRevenue += order.total
        });
    
     const totalorder = orders.length
      const totalproducts = totalItems
      
    return res.json({
        orders,
        totalorder,
        totalproducts,
        totalRevenue
    })
    }catch(err){

      return res.status(500).json({ error: err.message });
    }
        
}

module.exports = { handlegetOrders }