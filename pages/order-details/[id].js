import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../frontend/context/authContext';
import OrderTimeline from '../../components/OrderTimeline';
import OrderStatusBadge from '../../components/OrderStatusBadge';

const OrderDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const { user, loading: authLoading } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (id && user) {
            fetchOrder();
        }
    }, [id, user]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setOrder(response.data.order);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
            toast.error('Failed to load order details');
            router.push('/my-orders');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    if (authLoading || !user || loading) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#f5f1e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    fontSize: '18px',
                    color: '#8b7355'
                }}>
                    Loading order details...
                </div>
            </div>
        );
    }

    if (!order) {
        return null;
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f1e8',
            padding: '40px 20px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {/* Back button */}
                <button
                    onClick={() => router.push('/my-orders')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#fef6e4',
                        color: '#8b7355',
                        border: '2px solid #8b7355',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginBottom: '24px',
                        fontFamily: 'Georgia, serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    ← Back to My Orders
                </button>

                {/* Header */}
                <div style={{
                    backgroundColor: '#fef6e4',
                    border: '2px solid #8b7355',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '24px'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '16px',
                        marginBottom: '16px'
                    }}>
                        <div>
                            <h1 style={{
                                fontSize: '32px',
                                fontWeight: '700',
                                color: '#5a4a3a',
                                marginBottom: '8px',
                                fontFamily: 'Georgia, serif'
                            }}>
                                Order #{order._id.slice(-8).toUpperCase()}
                            </h1>
                            <p style={{
                                fontSize: '16px',
                                color: '#8b7355',
                                fontStyle: 'italic'
                            }}>
                                Placed on {formatDate(order.createdAt)}
                            </p>
                        </div>
                        <OrderStatusBadge status={order.orderStatus} />
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '24px'
                }}>
                    {/* Timeline */}
                    <OrderTimeline order={order} />

                    {/* Order Items */}
                    <div style={{
                        backgroundColor: '#fef6e4',
                        border: '2px solid #8b7355',
                        borderRadius: '12px',
                        padding: '24px'
                    }}>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#5a4a3a',
                            marginBottom: '20px',
                            fontFamily: 'Georgia, serif'
                        }}>
                            Items Ordered ({order.items.length})
                        </h3>

                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    padding: '16px',
                                    backgroundColor: '#f5ead4',
                                    borderRadius: '8px',
                                    marginBottom: '12px',
                                    border: '1px solid #d4c5b9'
                                }}
                            >
                                {item.product?.images?.[0] && (
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.name}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '2px solid #8b7355'
                                        }}
                                    />
                                )}
                                <div style={{ flex: 1 }}>
                                    <h4 style={{
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        color: '#5a4a3a',
                                        marginBottom: '8px'
                                    }}>
                                        {item.name}
                                    </h4>
                                    <div style={{
                                        fontSize: '14px',
                                        color: '#8b7355',
                                        marginBottom: '4px'
                                    }}>
                                        Quantity: {item.quantity}
                                    </div>
                                    <div style={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        color: '#5a4a3a',
                                        fontFamily: 'Georgia, serif'
                                    }}>
                                        {formatCurrency(item.price)}
                                    </div>
                                </div>
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: '#5a4a3a',
                                    fontFamily: 'Georgia, serif'
                                }}>
                                    {formatCurrency(item.price * item.quantity)}
                                </div>
                            </div>
                        ))}

                        {/* Order Summary */}
                        <div style={{
                            marginTop: '24px',
                            paddingTop: '20px',
                            borderTop: '2px solid #8b7355'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span style={{
                                    fontSize: '16px',
                                    color: '#8b7355',
                                    fontWeight: '600'
                                }}>
                                    Subtotal
                                </span>
                                <span style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    color: '#5a4a3a'
                                }}>
                                    {formatCurrency(order.totalAmount)}
                                </span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingTop: '12px',
                                borderTop: '1px solid #d4c5b9'
                            }}>
                                <span style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#5a4a3a',
                                    fontFamily: 'Georgia, serif'
                                }}>
                                    Total
                                </span>
                                <span style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: '#5a4a3a',
                                    fontFamily: 'Georgia, serif'
                                }}>
                                    {formatCurrency(order.totalAmount)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div style={{
                        backgroundColor: '#fef6e4',
                        border: '2px solid #8b7355',
                        borderRadius: '12px',
                        padding: '24px'
                    }}>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#5a4a3a',
                            marginBottom: '16px',
                            fontFamily: 'Georgia, serif'
                        }}>
                            Shipping Address
                        </h3>
                        <div style={{
                            fontSize: '16px',
                            color: '#5a4a3a',
                            lineHeight: '1.6'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                                {order.shippingAddress.name}
                            </div>
                            <div style={{ color: '#8b7355' }}>
                                {order.shippingAddress.email}
                            </div>
                            <div style={{ marginTop: '8px', color: '#8b7355' }}>
                                {order.shippingAddress.address}
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div style={{
                        backgroundColor: '#fef6e4',
                        border: '2px solid #8b7355',
                        borderRadius: '12px',
                        padding: '24px'
                    }}>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#5a4a3a',
                            marginBottom: '16px',
                            fontFamily: 'Georgia, serif'
                        }}>
                            Payment Information
                        </h3>
                        <div style={{
                            fontSize: '16px',
                            color: '#5a4a3a'
                        }}>
                            <div style={{ marginBottom: '8px' }}>
                                <strong>Payment Method:</strong> {order.paymentMethod}
                            </div>
                            <div>
                                <strong>Payment Status:</strong>{' '}
                                <span style={{
                                    color: order.paymentStatus === 'completed' ? '#10b981' : '#f59e0b',
                                    fontWeight: '600',
                                    textTransform: 'capitalize'
                                }}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                            {order.upiTransactionId && (
                                <div style={{ marginTop: '8px', fontSize: '14px', color: '#8b7355' }}>
                                    Transaction ID: {order.upiTransactionId}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
