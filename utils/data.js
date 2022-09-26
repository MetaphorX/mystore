import bcrypt from "bcryptjs"

const data = {
    users:[
        {
            name: 'Shakur',
            email: 'shakur@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin:true
        },
        {
            name: 'Aisha',
            email: 'aisha@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin:false
        },
    ],
    products:[
        {
            name: 'Jean Jacket',
            slug: 'jean-jacket',
            category: 'SHIRT',
            price:48,
            discount:15,
            description: 'Men Winter Shirt',
            image: '/products/jacket-1.jpg',
            numReviews:8,
            countInStock:15,
            rating:4.5,
            brand: 'Tops'
        },
        {
            name: 'Sports Shorts',
            slug: 'sports-short',
            category: 'SHORTS',
            price:50,
            discount:0,
            description: 'Comfy shorts for recreation',
            image: '/products/shorts-1.jpg',
            numReviews:5,
            countInStock:10,
            rating:4.0,
            brand: 'Shorts'
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'SHIRTS',
            price:80,
            discount:0,
            description: 'Stylish shirt',
            image: '/products/shirt-1.jpg',
            numReviews:5,
            countInStock:10,
            rating:4.0,
            brand: 'Tops'
        },
        {
            name: 'Sports Shoe',
            slug: 'white-sport-shoe',
            category: 'SPORTS',
            price:100,
            discount:0,
            description: 'Exquisite white sports shoe',
            image: '/products/sports-1.jpg',
            numReviews:5,
            countInStock:10,
            rating:4.0,
            brand: 'Tops'
        },
        {
            name: 'Smart Watch',
            slug: 'smart-blue-watch',
            category: 'WATCHES',
            price:800,
            discount:10,
            description: 'Smart watch to with style',
            image: '/products/watch-1.jpg',
            numReviews:5,
            countInStock:10,
            rating:4.0,
            brand: 'Apple'
        },
        {
            name: 'Comfy Sports Jacket',
            slug: 'comfy-brown-jacket',
            category: 'JACKET',
            price:100,
            discount:0,
            description: 'Comfy brown jacket',
            image: '/products/jacket-2.jpg',
            numReviews:5,
            countInStock:10,
            rating:4.0,
            brand: 'Tops'
        },

    ]
}


export default data