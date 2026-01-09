import React from 'react';
import { FaBox, FaCog, FaShippingFast, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OrderStatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'Placed':
                return {
                    color: '#3b82f6',
                    bgColor: '#dbeafe',
                    icon: <FaBox />,
                    label: 'Order Placed'
                };
            case 'Processing':
                return {
                    color: '#f59e0b',
                    bgColor: '#fef3c7',
                    icon: <FaCog />,
                    label: 'Processing'
                };
            case 'Shipped':
                return {
                    color: '#8b5cf6',
                    bgColor: '#ede9fe',
                    icon: <FaShippingFast />,
                    label: 'Shipped'
                };
            case 'Out for Delivery':
                return {
                    color: '#06b6d4',
                    bgColor: '#cffafe',
                    icon: <FaTruck />,
                    label: 'Out for Delivery'
                };
            case 'Delivered':
                return {
                    color: '#10b981',
                    bgColor: '#d1fae5',
                    icon: <FaCheckCircle />,
                    label: 'Delivered'
                };
            case 'Cancelled':
                return {
                    color: '#ef4444',
                    bgColor: '#fee2e2',
                    icon: <FaTimesCircle />,
                    label: 'Cancelled'
                };
            default:
                return {
                    color: '#6b7280',
                    bgColor: '#f3f4f6',
                    icon: <FaBox />,
                    label: status
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: config.bgColor,
                color: config.color,
                fontSize: '14px',
                fontWeight: '600',
                border: `2px solid ${config.color}20`
            }}
        >
            <span style={{ fontSize: '16px' }}>{config.icon}</span>
            <span>{config.label}</span>
        </div>
    );
};

export default OrderStatusBadge;
