import dbConnect from '../../../backend/lib/mongodb';
import Order from '../../../backend/models/Order';
import { authMiddleware, adminMiddleware } from '../../../backend/middleware/auth';

async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        // Get all orders for admin
        const orders = await Order.find({})
            .populate('user', 'name email')
            .populate('items.product')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error('Get all orders error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching orders',
        });
    }
}

export default authMiddleware(adminMiddleware(handler));
