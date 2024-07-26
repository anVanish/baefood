const { authRouter, foodRouter, categoryRouter, orderRouter, cartRouter } = require("./router")


exports.route = (app) =>{
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/foods', foodRouter)
    app.use('/api/v1/categories', categoryRouter)
    app.use('/api/v1/orders', orderRouter)
    app.use('/api/v1/carts', cartRouter)
}