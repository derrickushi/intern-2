import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../frontend/context/authContext';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        await register(name, email, password);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                background: 'linear-gradient(to bottom, #f5f1e8 0%, #e8dcc8 100%)',
                fontFamily: "'Playfair Display', 'Georgia', serif"
            }}>
            <Head>
                <title>Timeless Treasures - Register</title>
                <meta name="description" content="Join Timeless Treasures" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            <style jsx>{`
                .vintage-border {
                    border: 3px solid #8B7355;
                    box-shadow: 
                        0 0 0 1px #D4AF37,
                        0 0 0 4px #8B7355,
                        0 10px 30px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }
                
                .vintage-input {
                    background: #FBF8F1;
                    border: 2px solid #C9B896;
                    font-family: 'Crimson Text', serif;
                    color: #3E2723;
                    transition: all 0.3s ease;
                }
                
                .vintage-input:focus {
                    outline: none;
                    border-color: #D4AF37;
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
                    background: #FFFEF9;
                }
                
                .vintage-button {
                    background: linear-gradient(to bottom, #8B7355 0%, #704214 100%);
                    border: 2px solid #D4AF37;
                    color: #FBF8F1;
                    font-family: 'Playfair Display', serif;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    box-shadow: 
                        0 4px 6px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }
                
                .vintage-button:hover:not(:disabled) {
                    background: linear-gradient(to bottom, #704214 0%, #5a3410 100%);
                    box-shadow: 
                        0 6px 12px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        0 0 20px rgba(212, 175, 55, 0.4);
                    transform: translateY(-2px);
                }
                
                .vintage-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                .ornament {
                    color: #D4AF37;
                    font-size: 2rem;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
                }
                
                .vintage-title {
                    font-family: 'Playfair Display', serif;
                    color: #3E2723;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    letter-spacing: 2px;
                }
                
                .vintage-link {
                    color: #8B7355;
                    text-decoration: none;
                    border-bottom: 1px solid #D4AF37;
                    transition: all 0.3s ease;
                    font-family: 'Crimson Text', serif;
                }
                
                .vintage-link:hover {
                    color: #D4AF37;
                    border-bottom-color: #8B7355;
                }
                
                .aged-paper {
                    background: 
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)),
                        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
                    background-color: #FBF8F1;
                }

                .error-message {
                    background: #f8d7da;
                    border: 1px solid #C9B896;
                    color: #721c24;
                    font-family: 'Crimson Text', serif;
                    padding: 1rem;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                }
            `}</style>

            <div className="max-w-md w-full">
                {/* Ornamental top decoration */}
                <div className="text-center mb-6">
                    <div className="ornament">❦</div>
                </div>

                {/* Main register card */}
                <div className="vintage-border aged-paper rounded-lg p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="vintage-title text-4xl font-bold mb-2">
                            Timeless Treasures
                        </h1>
                        <div className="ornament text-xl mb-4">✦ ✦ ✦</div>
                        <h2 className="text-2xl font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Playfair Display', serif" }}>
                            Join Our Collection
                        </h2>
                        <p className="text-sm" style={{ color: '#704214', fontFamily: "'Crimson Text', serif" }}>
                            Become a Member
                        </p>
                    </div>

                    {/* Register Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Crimson Text', serif" }}>
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="vintage-input block w-full px-4 py-3 rounded text-base"
                                placeholder="Your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Crimson Text', serif" }}>
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="vintage-input block w-full px-4 py-3 rounded text-base"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Crimson Text', serif" }}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="vintage-input block w-full px-4 py-3 rounded text-base"
                                placeholder="Minimum 6 characters"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Crimson Text', serif" }}>
                                Confirm Password
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="vintage-input block w-full px-4 py-3 rounded text-base"
                                placeholder="Re-enter your password"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="vintage-button w-full py-3 px-4 rounded text-sm"
                            >
                                {isLoading ? 'Creating Account...' : 'Join Collection'}
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 text-center space-y-3">
                        <p className="text-sm" style={{ color: '#704214', fontFamily: "'Crimson Text', serif" }}>
                            Already a member?{' '}
                            <Link href="/login">
                                <a className="vintage-link font-semibold">
                                    Sign In Here
                                </a>
                            </Link>
                        </p>

                        <div className="pt-4 border-t border-gray-300">
                            <Link href="/">
                                <a className="vintage-link text-sm">
                                    ← Return to Marketplace
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Ornamental bottom decoration */}
                <div className="text-center mt-6">
                    <div className="ornament">❦</div>
                </div>

                {/* Established badge */}
                <div className="text-center mt-4">
                    <p className="text-xs" style={{ color: '#8B7355', fontFamily: "'Crimson Text', serif", letterSpacing: '2px' }}>
                        EST. 1890 • PURVEYORS OF FINE ANTIQUITIES
                    </p>
                </div>
            </div>
        </div>
    );
}
