import React from 'react';
import Link from 'next/link';
import OrderStatusBadge from './OrderStatusBadge';

const OrderCard = ({ order }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Show first 2 items
    const displayItems = order.items.slice(0, 2);
    const remainingCount = order.items.length - 2;

    return (
        <div style={{
            backgroundColor: '#fef6e4',
            border: '2px solid #8b7355',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(139, 115, 85, 0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.2)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 115, 85, 0.1)';
            }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#5a4a3a',
                        fontFamily: 'Georgia, serif',
                        marginBottom: '4px'
                    }}>
                        Order #{order._id.slice(-8).toUpperCase()}
                    </div>
                    <div style={{
                        fontSize: '14px',
                        color: '#8b7355',
                        fontStyle: 'italic'
                    }}>
                        Placed on {formatDate(order.createdAt)}
                    </div>
                </div>
                <OrderStatusBadge status={order.orderStatus} />
            </div>

            {/* Items */}
            <div style={{ marginBottom: '16px' }}>
                {displayItems.map((item, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '8px'
                    }}>
                        {item.product?.images?.[0] && (
                            <img
                                src={item.product.images[0]}
                                alt={item.name}
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    border: '1px solid #d4c5b9'
                                }}
                            />
                        )}
                        <div style={{ flex: 1 }}>
                            <div style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#5a4a3a'
                            }}>
                                {item.name}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: '#8b7355'
                            }}>
                                Qty: {item.quantity} × {formatCurrency(item.price)}
                            </div>
                        </div>
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div style={{
                        fontSize: '14px',
                        color: '#8b7355',
                        fontStyle: 'italic',
                        marginTop: '8px'
                    }}>
                        and {remainingCount} more item{remainingCount > 1 ? 's' : ''}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid #d4c5b9',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <div style={{
                        fontSize: '14px',
                        color: '#8b7355',
                        marginBottom: '4px'
                    }}>
                        Total Amount
                    </div>
                    <div style={{
                        fontSize: '22px',
                        fontWeight: '700',
                        color: '#5a4a3a',
                        fontFamily: 'Georgia, serif'
                    }}>
                        {formatCurrency(order.totalAmount)}
                    </div>
                </div>
                <Link href={`/order-details/${order._id}`}>
                    <button style={{
                        padding: '10px 24px',
                        backgroundColor: '#8b7355',
                        color: '#fef6e4',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        fontFamily: 'Georgia, serif'
                    }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#6b5845'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#8b7355'}>
                        View Details
                    </button>
                </Link>
            </div>

            {/* Estimated delivery */}
            {order.estimatedDeliveryDate && order.orderStatus !== 'Delivered' && order.orderStatus !== 'Cancelled' && (
                <div style={{
                    marginTop: '12px',
                    padding: '10px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#1e40af',
                    fontWeight: '600'
                }}>
                    📦 Estimated Delivery: {formatDate(order.estimatedDeliveryDate)}
                </div>
            )}
        </div>
    );
};

export default OrderCard;
