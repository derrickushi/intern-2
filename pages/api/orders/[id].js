import dbConnect from '../../../backend/lib/mongodb';
import Order from '../../../backend/models/Order';
import { authMiddleware } from '../../../backend/middleware/auth';

async function handler(req, res) {
    await dbConnect();

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
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

    if (req.method === 'PUT') {
        try {
            const { orderStatus, trackingNumber, note } = req.body;

            // Get order by ID
            const order = await Order.findById(id);

            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found',
                });
            }

            // Update order status
            if (orderStatus) {
                order.orderStatus = orderStatus;

                // Add to status history
                order.statusHistory.push({
                    status: orderStatus,
                    timestamp: new Date(),
                    note: note || `Order status updated to ${orderStatus}`
                });

                // Update specific date fields based on status
                if (orderStatus === 'Shipped' && !order.shippedDate) {
                    order.shippedDate = new Date();
                }
                if (orderStatus === 'Delivered' && !order.deliveredDate) {
                    order.deliveredDate = new Date();
                }
            }

            // Update tracking number if provided
            if (trackingNumber) {
                order.trackingNumber = trackingNumber;
            }

            await order.save();
            await order.populate('items.product');

            return res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                order,
            });
        } catch (error) {
            console.error('Update order error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating order',
            });
        }
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
}

export default authMiddleware(handler);
