const Users = require('../backend/app/models/Users')
const Foods = require('../backend/app/models/Foods')
const Categories = require('../backend/app/models/Categories')
const {usersData, foodsData, categoriesData} = require('./data')
const mongodb = require('../backend/config/mongodb')
mongodb.connect()

exports.seedingUser = async () => {
    try{
        await Users.deleteMany({})
        console.log('Users deleted')
        await Users.insertMany(usersData)
        console.log('Users inserted')
    }catch(error){
        console.log(`Users seeding failure: ${error.message}`)
    }
}

exports.seedingFoods = async () => {
    try{
        await Foods.deleteMany({})
        console.log('Foods deleted')
        await Foods.insertMany(foodsData)
        console.log('Foods inserted')
    }catch(error){
        console.log(`Foods seeding failure: ${error.message}`)
    }
}

exports.seedingCategories = async () => {
    try{
        await Categories.deleteMany({})
        console.log('Categories deleted')
        await Categories.insertMany(categoriesData)
        console.log('Categories inserted')
    } catch(error){
        console.log(`Categories seeding failure: ${error.message}`)
    }
}
