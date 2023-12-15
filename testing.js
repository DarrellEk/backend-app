import prisma from "./src/utils/prisma.js"

async function main() {

//populate products table with test product
prisma.products.create({
    data:{
        name: 'plan1',
        description: 'description1',
        price: 2050 //actual price is 20.50. Store as actual price * 100 
    }
}).then(product=>{
    console.log(product)
}).catch(e=>{
    console.log(e.message)
})
}

main()