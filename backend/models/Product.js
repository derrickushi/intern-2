import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a product title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    images: {
        type: [String],
        required: [true, 'Please provide at least one image'],
    },
    category: {
        type: String,
        enum: ['Newspapers', 'Coins', 'Currency', 'Other'],
        required: [true, 'Please provide a category'],
    },
    year: {
        type: Number,
    },
    condition: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    details: {
        type: Map,
        of: String,
    },
    currentInventory: {
        type: Number,
        required: [true, 'Please provide inventory count'],
        min: [0, 'Inventory cannot be negative'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
