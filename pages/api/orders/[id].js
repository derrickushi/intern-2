import dbConnect from '../../../backend/lib/mongodb';
import Order from '../../../backend/models/Order';
import { authMiddleware } from '../../../backend/middleware/auth';

async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { id } = req.query;

        const order = await Order.findOne({
            _id: id,
            user: req.user.id, // Ensure user can only access their own orders
        }).populate('items.product');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Get order error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching order',
        });
    }
}

export default authMiddleware(handler);
