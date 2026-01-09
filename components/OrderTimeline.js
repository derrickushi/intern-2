import React from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

const OrderTimeline = ({ order }) => {
    const allStatuses = ['Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

    // Get the index of current status
    const currentStatusIndex = allStatuses.indexOf(order.orderStatus);

    // Check if order is cancelled
    const isCancelled = order.orderStatus === 'Cancelled';

    const formatDate = (date) => {
        if (!date) return null;
        return new Date(date).toLocaleString('en-IN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusTimestamp = (status) => {
        const historyItem = order.statusHistory?.find(item => item.status === status);
        return historyItem ? formatDate(historyItem.timestamp) : null;
    };

    return (
        <div style={{
            padding: '24px',
            backgroundColor: '#fef6e4',
            borderRadius: '12px',
            border: '2px solid #8b7355'
        }}>
            <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#5a4a3a',
                marginBottom: '24px',
                fontFamily: 'Georgia, serif'
            }}>
                Order Status Timeline
            </h3>

            {isCancelled ? (
                <div style={{
                    padding: '16px',
                    backgroundColor: '#fee2e2',
                    borderRadius: '8px',
                    border: '2px solid #ef4444',
                    color: '#991b1b',
                    fontWeight: '600'
                }}>
                    Order Cancelled
                </div>
            ) : (
                <div style={{ position: 'relative' }}>
                    {allStatuses.map((status, index) => {
                        const isCompleted = index <= currentStatusIndex;
                        const isCurrent = index === currentStatusIndex;
                        const timestamp = getStatusTimestamp(status);

                        return (
                            <div key={status} style={{ position: 'relative', paddingBottom: '32px' }}>
                                {/* Vertical line */}
                                {index < allStatuses.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '11px',
                                        top: '24px',
                                        width: '2px',
                                        height: 'calc(100% - 24px)',
                                        backgroundColor: isCompleted ? '#10b981' : '#d1d5db'
                                    }} />
                                )}

                                {/* Status item */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '16px'
                                }}>
                                    {/* Icon */}
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: isCompleted ? '#10b981' : '#e5e7eb',
                                        color: isCompleted ? '#fff' : '#9ca3af',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        flexShrink: 0,
                                        zIndex: 1,
                                        border: isCurrent ? '3px solid #059669' : 'none',
                                        boxShadow: isCurrent ? '0 0 0 4px #d1fae5' : 'none'
                                    }}>
                                        {isCompleted ? <FaCheckCircle /> : <FaCircle />}
                                    </div>

                                    {/* Status info */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontSize: '16px',
                                            fontWeight: isCurrent ? '700' : '600',
                                            color: isCompleted ? '#065f46' : '#6b7280',
                                            marginBottom: '4px'
                                        }}>
                                            {status}
                                        </div>
                                        {timestamp && (
                                            <div style={{
                                                fontSize: '14px',
                                                color: '#8b7355',
                                                fontStyle: 'italic'
                                            }}>
                                                {timestamp}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Estimated delivery date */}
            {!isCancelled && order.estimatedDeliveryDate && (
                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '8px',
                    border: '2px solid #3b82f6'
                }}>
                    <div style={{
                        fontSize: '14px',
                        color: '#1e40af',
                        fontWeight: '600',
                        marginBottom: '4px'
                    }}>
                        {order.orderStatus === 'Delivered' ? 'Delivered On' : 'Estimated Delivery'}
                    </div>
                    <div style={{
                        fontSize: '18px',
                        color: '#1e3a8a',
                        fontWeight: '700'
                    }}>
                        {formatDate(order.deliveredDate || order.estimatedDeliveryDate)}
                    </div>
                </div>
            )}

            {/* Tracking number */}
            {order.trackingNumber && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#374151'
                }}>
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                </div>
            )}
        </div>
    );
};

export default OrderTimeline;
