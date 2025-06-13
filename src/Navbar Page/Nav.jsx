import React, { useState } from "react";

function Navbar() {
    const [searchText, setSearchText] = useState("");
    const [qrHistory, setQrHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        const email = searchText.trim();

        if (!email) {
            alert("Please enter a valid email");
            return;
        }

        setIsLoading(true);
        try {
            const URL = "https://qr-code-backend-gaz0.onrender.com";
            const res = await fetch(`${URL}/api/qr-history?email=${encodeURIComponent(email)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                if (data.qrHistory && data.qrHistory.length > 0) {
                    setQrHistory(data.qrHistory);
                } else {
                    alert("No QR codes found for this email.");
                    setQrHistory([]);
                }
            } else {
                alert(data.message || "QR Code not found");
                setQrHistory([]);
            }
        } catch (err) {
            alert("Error fetching QR code history");
            console.error(err);
            setQrHistory([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLogout = () => {
        window.location.href = "Auth.jsx";
    };

    return (
        <div className="app-container">
            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .app-container {
                    background: #ffffff;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .navbar {
                    background: #ffffff;
                    padding: 1rem 2rem;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    border-bottom: 1px solid #e5e7eb;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .navbar-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .logo {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #2563eb;
                    letter-spacing: -0.02em;
                }

                .search-container {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .search-input {
                    padding: 0.75rem 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    background: #ffffff;
                    font-size: 0.95rem;
                    min-width: 280px;
                    transition: all 0.3s ease;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }

                .search-input::placeholder {
                    color: #888;
                }

                .btn {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-primary {
                    background: #2563eb;
                    color: white;
                }

                .btn-primary:hover {
                    background: #1d4ed8;
                    transform: translateY(-1px);
                }

                .btn-primary:active {
                    transform: translateY(0);
                }

                .btn-secondary {
                    background: #ffffff;
                    color: #2563eb;
                    border: 2px solid #2563eb;
                }

                .btn-secondary:hover {
                    background: #2563eb;
                    color: white;
                }

                .btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .main-content {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 2rem;
                    background: #ffffff;
                }

                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 2rem;
                    text-align: center;
                }

                .qr-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2rem;
                    margin-top: 1.5rem;
                }

                .qr-card {
                    background: #ffffff;
                    border-radius: 12px;
                    padding: 1rem;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e5e7eb;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .qr-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: #2563eb;
                    border-radius: 12px 12px 0 0;
                }

                .qr-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                }

                .qr-image {
                    width: 20px;
                    height: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    margin-bottom: 1rem;
                    transition: transform 0.3s ease;
                }

                .qr-card:hover .qr-image {
                    transform: scale(1.05);
                }

                .qr-text {
                    font-size: 0.95rem;
                    color: #333;
                    margin-bottom: 0.5rem;
                    word-wrap: break-word;
                    line-height: 1.4;
                }

                .qr-date {
                    font-size: 0.85rem;
                    color: #666;
                    font-weight: 500;
                }

                .empty-state {
                    text-align: center;
                    color: #6b7280;
                    font-size: 1.1rem;
                    margin-top: 4rem;
                }

                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-right: 0.5rem;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .fade-in {
                    animation: fadeIn 0.6s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .navbar-content {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .search-container {
                        flex-direction: column;
                        width: 100%;
                    }

                    .search-input {
                        min-width: auto;
                        width: 100%;
                    }

                    .main-content {
                        padding: 1rem;
                    }

                    .qr-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                    }

                    .section-title {
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .navbar {
                        padding: 1rem;
                    }

                    .logo {
                        font-size: 1.5rem;
                    }

                    .search-container {
                        gap: 0.75rem;
                    }

                    .btn {
                        padding: 0.6rem 1.2rem;
                        font-size: 0.9rem;
                    }
                }
            `}</style>

            <nav className="navbar">
                <div className="navbar-content">
                    <h1 className="logo">Qrafter</h1>
                    <div className="search-container">
                        <input
                            type="email"
                            className="search-input"
                            placeholder="Enter your email to view QR history..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSearch}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Searching...
                                </>
                            ) : (
                                'Search'
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                {qrHistory.length > 0 ? (
                    <div className="fade-in">
                        <h2 className="section-title">Your QR History</h2>
                        <div className="qr-grid">
                            {qrHistory.map((qr, index) => (
                                <div key={index} className="qr-card fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                                    <img 
                                        src={qr.qrImage} 
                                        alt={`QR ${index}`} 
                                        className="qr-image"
                                    />
                                    <p className="qr-text">
                                        <strong>Content:</strong> {qr.text}
                                    </p>
                                    <p className="qr-date">
                                        {new Date(qr.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>Enter an email address to view QR code history</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;