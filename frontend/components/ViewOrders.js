import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DENOMINATION from '../../backend/utils/currencyProvider';
import Image from './Image';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/orders/admin');
            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'shipped': 'bg-purple-100 text-purple-800',
            'delivered': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className="text-center py-10">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>;
    }

    if (orders.length === 0) {
        return <div className="text-center py-10 text-gray-600">No orders yet.</div>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-light mb-6">Customer Orders</h2>
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="border rounded-lg overflow-hidden">
                        {/* Order Header */}
                        <div
                            className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition"
                            onClick={() => toggleOrderDetails(order._id)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="font-semibold text-gray-900">
                                            Order #{order._id.slice(-8).toUpperCase()}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                            {order.orderStatus}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.paymentStatus)}`}>
                                            Payment: {order.paymentStatus}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p><strong>Customer:</strong> {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})</p>
                                        <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <p className="text-xl font-semibold text-gray-900">
                                        {DENOMINATION}{order.totalAmount}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Details (Expandable) */}
                        {expandedOrder === order._id && (
                            <div className="p-4 bg-white border-t">
                                {/* Shipping Address */}
                                <div className="mb-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                                    <p className="text-sm text-gray-600">
                                        {order.shippingAddress.name}<br />
                                        {order.shippingAddress.email}<br />
                                        {order.shippingAddress.address}
                                    </p>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        Quantity: {item.quantity} × {DENOMINATION}{item.price}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">
                                                        {DENOMINATION}{(item.quantity * item.price).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Info */}
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Payment Method:</span>
                                        <span className="font-medium">{order.paymentMethod || 'UPI'}</span>
                                    </div>
                                    {order.transactionId && (
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-600">Transaction ID:</span>
                                            <span className="font-mono text-sm">{order.transactionId}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewOrders;
