import dbConnect from '../../../backend/lib/mongodb';
import Product from '../../../backend/models/Product';
import { adminMiddleware } from '../../../backend/middleware/auth';

async function handleGet(req, res) {
    const { id } = req.query;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        return res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error('Get product error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching product',
        });
    }
}

async function handlePut(req, res) {
    const { id } = req.query;

    try {
        const { currentInventory, price, title } = req.body;

        const updateData = {};
        if (currentInventory !== undefined) updateData.currentInventory = currentInventory;
        if (price !== undefined) updateData.price = price;
        if (title !== undefined) updateData.title = title;

        const product = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        console.log('Product updated:', product.title, 'Stock:', product.currentInventory);

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        console.error('Update product error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating product: ' + error.message,
        });
    }
}

async function handleDelete(req, res) {
    const { id } = req.query;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        console.log('Product deleted:', product.title);

        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        console.error('Delete product error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting product',
        });
    }
}

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'GET') {
        return handleGet(req, res);
    }

    if (req.method === 'PUT') {
        return adminMiddleware(handlePut)(req, res);
    }

    if (req.method === 'DELETE') {
        return adminMiddleware(handleDelete)(req, res);
    }

    return res.status(405).json({
        success: false,
        message: 'Method not allowed',
    });
}
