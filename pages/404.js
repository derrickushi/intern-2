import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                background: 'linear-gradient(to bottom, #f5f1e8 0%, #e8dcc8 100%)',
                fontFamily: "'Playfair Display', 'Georgia', serif"
            }}>
            <Head>
                <title>Page Not Found - Timeless Treasures</title>
                <meta name="description" content="Page not found" />
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
                    border-bottom: 2px solid #D4AF37;
                    transition: all 0.3s ease;
                    font-family: 'Crimson Text', serif;
                    padding: 0.5rem 1rem;
                    display: inline-block;
                }
                
                .vintage-link:hover {
                    color: #D4AF37;
                    border-bottom-color: #8B7355;
                    background: rgba(212, 175, 55, 0.1);
                }
                
                .aged-paper {
                    background: 
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)),
                        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
                    background-color: #FBF8F1;
                }

                .error-number {
                    font-size: 8rem;
                    font-weight: 700;
                    color: #D4AF37;
                    text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
                    line-height: 1;
                    margin: 0;
                }

                .divider {
                    height: 2px;
                    background: linear-gradient(to right, transparent, #D4AF37, transparent);
                    margin: 2rem 0;
                }
            `}</style>

            <div className="max-w-2xl w-full">
                {/* Ornamental top decoration */}
                <div className="text-center mb-6">
                    <div className="ornament">❦</div>
                </div>

                {/* Main error card */}
                <div className="vintage-border aged-paper rounded-lg p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="vintage-title text-4xl font-bold mb-2">
                            Timeless Treasures
                        </h1>
                        <div className="ornament text-xl mb-4">✦ ✦ ✦</div>
                    </div>

                    {/* Error Number */}
                    <div className="text-center mb-6">
                        <p className="error-number">404</p>
                    </div>

                    <div className="divider"></div>

                    {/* Error Message */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-semibold mb-4" style={{ color: '#3E2723', fontFamily: "'Playfair Display', serif" }}>
                            Treasure Not Found
                        </h2>
                        <p className="text-lg mb-4" style={{ color: '#704214', fontFamily: "'Crimson Text', serif" }}>
                            Alas! The page you seek has been lost to the annals of time.
                        </p>
                        <p className="text-base" style={{ color: '#8B7355', fontFamily: "'Crimson Text', serif" }}>
                            Perhaps it was misplaced during our last inventory, or it never existed in our collection.
                        </p>
                    </div>

                    <div className="divider"></div>

                    {/* Navigation Links */}
                    <div className="text-center space-y-4 mt-8">
                        <div>
                            <Link href="/">
                                <a className="vintage-link text-lg font-semibold">
                                    ← Return to Marketplace
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href="/categories">
                                <a className="vintage-link text-lg font-semibold">
                                    Browse Our Collections
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
