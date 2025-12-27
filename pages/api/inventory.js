import dbConnect from '../../backend/lib/mongodb';
import Product from '../../backend/models/Product';
import { adminMiddleware } from '../../backend/middleware/auth';

async function handleGet(req, res) {
  try {
    const { q, category } = req.query;
    let query = {};

    if (q) {
      query = {
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      };
    }

    if (category && category !== 'All Items') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products',
    });
  }
}

async function handlePost(req, res) {
  try {
    const {
      title,
      description,
      price,
      images,
      category,
      year,
      condition,
      isFeatured,
      details,
      currentInventory
    } = req.body;

    // Validation
    if (!title || !description || !price || !category || currentInventory === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      images: images || [],
      category,
      year,
      condition,
      isFeatured: isFeatured || false,
      details: details || {},
      currentInventory,
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating product',
    });
  }
}

async function handlePut(req, res) {
  try {
    const { id, ...updateData } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

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

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating product',
    });
  }
}

async function handleDelete(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

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

async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return adminMiddleware(handlePost)(req, res);
    case 'PUT':
      return adminMiddleware(handlePut)(req, res);
    case 'DELETE':
      return adminMiddleware(handleDelete)(req, res);
    default:
      return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default handler;
