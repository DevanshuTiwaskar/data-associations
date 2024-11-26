const express = require('express');
const app = express();
require('./config/db.config')

const { UserModel, ProductModel, SaleModel } = require('./models/models');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to create a user
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Create new user
        const user = new UserModel({
            name,
            email, 
            password
        });

        // Save user
        await user.save();
        
        res.send('User created successfully')

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Route to create a product
app.post('/products', async (req, res) => {
    try {
        const { name, price } = req.body;

        // Create new product
        const product = new ProductModel({
            name,
            price
        });

        // Save product
        await product.save();

        res.send('Product created successfully')

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});




// Route to handle product purchase
app.post('/purchase', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find user and product
        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(productId);

        if (!user || !product) {
            return res.status(404).json({ message: 'User or Product not found' });
        }


        // Calculate total amount
        const totalAmount = product.price * quantity;

        // Create new sale record
        const sale = new SaleModel({
            userId: user._id,
            productId: product._id,
            username: user.name,
            quantity: quantity,
            totalAmount: totalAmount
        });

        // Save the sale
        await sale.save();

        // Update user and product relationship
        user.productId = product._id;
        product.userId = user._id;
        
        await Promise.all([user.save(), product.save()]);

        res.status(200).json({ 
            message: 'Purchase successful',
            sale: sale
        });

    } catch (error) {
        console.error('Purchase error:', error);
        res.status(500).json({ message: 'Error processing purchase', error: error.message });
    }
});

// Route to get all sales
app.get('/sales', async (req, res) => {
    try {
        const sales = await SaleModel.find()
            .populate('userId', 'name email')
            .populate('productId', 'name price');//populate is used to get the user and product details from the database
            //.populate('userId', 'name email') name email is used to get the name and email of the user
            res.json(sales);

    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({ message: 'Error fetching sales', error: error.message });
    }
});







app.listen(3000, () => {
    console.log('Server is running on port 3000');
});