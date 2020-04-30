module.exports =  {
    USER_CUSTOMER : 'customer',
    USER_SELLER : 'seller',
    USER_ADMIN : 'admin',

    orderStatus : {
        ORDER_STAT_PLACED: 'Ordered', // 1. Customer
        ORDER_STAT_PACKING: 'Packing', // 2. Seller
        ORDER_STAT_SHIPPING: 'Out for Shipping', // 3. Seller
        ORDER_STAT_PKJ_ARRIVED: 'Package Arrived at carrier facility', // 4. Admin 
        ORDER_STAT_OUT_FOR_DELIVERY: 'Out for Delivery', // 5. Admin
        
        ORDER_STAT_CANCELED: 'Canceled', //(Before 6) Customer/Seller
        
        ORDER_STAT_DELIVERED: 'Delivered', // 6. Admin
    }
    
}
