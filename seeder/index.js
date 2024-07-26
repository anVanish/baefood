const {seedingUser, seedingFoods, seedingCategories} = require('./seeding')

async function seedingData(){
    try{
        await seedingCategories()
        await seedingUser()
        await seedingFoods()
        console.log('Succeed to seed data')
    } catch(error){
        console.log('Failed to seeded data')
    } finally{
        process.exit(0)   
    }
}

seedingData()