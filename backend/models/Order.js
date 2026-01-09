import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        name: String,
        price: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        image: String,
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        name: String,
        email: String,
        address: String,
    },
    paymentMethod: {
        type: String,
        enum: ['UPI', 'COD'],
        default: 'UPI',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    orderStatus: {
        type: String,
        enum: ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Placed',
    },
    estimatedDeliveryDate: {
        type: Date,
    },
    shippedDate: {
        type: Date,
    },
    deliveredDate: {
        type: Date,
    },
    trackingNumber: {
        type: String,
    },
    statusHistory: [{
        status: {
            type: String,
            enum: ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        note: String,
    }],
    upiTransactionId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Delete the cached model to ensure schema updates are applied
if (mongoose.models.Order) {
    delete mongoose.models.Order;
}

export default mongoose.model('Order', OrderSchema);
