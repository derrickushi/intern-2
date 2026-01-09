import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../frontend/context/authContext';
import OrderCard from '../components/OrderCard';

const MyOrders = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/orders', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const filterButtons = ['All', 'Placed', 'Processing', 'Shipped', 'Delivered'];

    const filteredOrders = filter === 'All'
        ? orders
        : orders.filter(order => order.orderStatus === filter);

    if (authLoading || !user) {
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
                {/* Header */}
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#5a4a3a',
                    marginBottom: '8px',
                    fontFamily: 'Georgia, serif'
                }}>
                    My Orders
                </h1>
                <p style={{
                    fontSize: '16px',
                    color: '#8b7355',
                    marginBottom: '32px'
                }}>
                    Track and manage your antique treasures
                </p>

                {/* Filter buttons */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '24px',
                    flexWrap: 'wrap'
                }}>
                    {filterButtons.map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: filter === status ? '#8b7355' : '#fef6e4',
                                color: filter === status ? '#fef6e4' : '#8b7355',
                                border: '2px solid #8b7355',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontFamily: 'Georgia, serif'
                            }}
                            onMouseEnter={(e) => {
                                if (filter !== status) {
                                    e.target.style.backgroundColor = '#f5ead4';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (filter !== status) {
                                    e.target.style.backgroundColor = '#fef6e4';
                                }
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                {/* Orders list */}
                {loading ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: '#8b7355',
                        fontSize: '18px'
                    }}>
                        Loading your orders...
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        backgroundColor: '#fef6e4',
                        borderRadius: '12px',
                        border: '2px dashed #8b7355'
                    }}>
                        <div style={{
                            fontSize: '48px',
                            marginBottom: '16px'
                        }}>
                            📦
                        </div>
                        <h3 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#5a4a3a',
                            marginBottom: '8px',
                            fontFamily: 'Georgia, serif'
                        }}>
                            {filter === 'All' ? 'No orders yet' : `No ${filter.toLowerCase()} orders`}
                        </h3>
                        <p style={{
                            fontSize: '16px',
                            color: '#8b7355',
                            marginBottom: '24px'
                        }}>
                            {filter === 'All'
                                ? 'Start exploring our antique collection!'
                                : `You don't have any ${filter.toLowerCase()} orders at the moment.`}
                        </p>
                        {filter === 'All' && (
                            <button
                                onClick={() => router.push('/')}
                                style={{
                                    padding: '12px 32px',
                                    backgroundColor: '#8b7355',
                                    color: '#fef6e4',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    fontFamily: 'Georgia, serif'
                                }}
                            >
                                Browse Products
                            </button>
                        )}
                    </div>
                ) : (
                    <div>
                        <div style={{
                            fontSize: '14px',
                            color: '#8b7355',
                            marginBottom: '16px',
                            fontWeight: '600'
                        }}>
                            Showing {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
                        </div>
                        {filteredOrders.map(order => (
                            <OrderCard key={order._id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
