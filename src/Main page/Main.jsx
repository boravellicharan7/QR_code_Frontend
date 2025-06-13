import React, { useState } from 'react';

const Main = () => {
    const [searchValue, setSearchValue] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [qrImage, setQrImage] = useState('');
    const [info, setInfo] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handlegenerate = async () => {
        if (!searchValue.trim() || !email.trim() || !name.trim()) {
            alert("Please enter name, email, and QR content.");
            return;
        }

        setIsGenerating(true);
        try {
            const URL = "https://qr-code-backend-gaz0.onrender.com";
            const res = await fetch(`${URL}/api/generate_qr`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: searchValue.trim(),
                    email: email.trim(),
                    name: name.trim() // Added name field
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setQrImage(data.qrCode);
                setInfo({
                    name: data.name,
                    email: data.email,
                    text: data.text,
                    createdAt: data.createdAt,
                });
            } else {
                alert(data.message || "QR Code generation failed");
            }
        } catch (err) {
            alert("Error generating QR code");
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlegenerate();
        }
    };

    const downloadQR = () => {
        if (qrImage) {
            const link = document.createElement('a');
            link.href = qrImage;
            link.download = `qr-code-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
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
                    background: #f8fafc;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    padding: 2rem;
                }

                .main-content {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    color: #1f2937;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.025em;
                }

                .subtitle {
                    font-size: 1.1rem;
                    color: #6b7280;
                    font-weight: 400;
                }

                .generator-card {
                    background: #ffffff;
                    border-radius: 16px;
                    padding: 2.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e5e7eb;
                    margin-bottom: 2rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-label {
                    display: block;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 0.5rem;
                }

                .form-input {
                    width: 100%;
                    padding: 0.875rem 1rem;
                    border: 2px solid #e5e7eb;
                    border-radius: 12px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background: #ffffff;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
                }

                .form-input::placeholder {
                    color: #9ca3af;
                }

                .form-textarea {
                    min-height: 100px;
                    resize: vertical;
                    font-family: inherit;
                }

                .generate-btn {
                    width: 100%;
                    padding: 1rem 2rem;
                    background: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .generate-btn:hover:not(:disabled) {
                    background: #1d4ed8;
                    transform: translateY(-1px);
                }

                .generate-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .loading-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-top: 2px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .output-card {
                    background: #ffffff;
                    border-radius: 16px;
                    padding: 2.5rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e5e7eb;
                    position: relative;
                    animation: fadeInUp 0.6s ease-out;
                }

                .output-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: #2563eb;
                    border-radius: 16px 16px 0 0;
                }

                .output-header {
                    display: flex;
                    justify-content: between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    gap: 4.5rem;
                }

                .output-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1f2937;
                }

                .download-btn {
                    padding: 0.5rem 1rem;
                    background: #10b981;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 0.6rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .download-btn:hover {
                    background: #059669;
                    transform: translateY(-1px);
                }

                .qr-display {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                }

                .qr-image-container {
                    text-align: center;
                }

                .qr-image {
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                    max-width: 250px;
                    width: 100%;
                    height: auto;
                }

                .qr-info {
                    flex: 1;
                    min-width: 300px;
                }

                .info-grid {
                    display: grid;
                    gap: 1rem;
                }

                .info-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .info-label {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .info-value {
                    font-size: 1rem;
                    color: #1f2937;
                    word-break: break-word;
                    background: #f9fafb;
                    padding: 0.75rem;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                }

                @keyframes fadeInUp {
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
                    .app-container {
                        padding: 1rem;
                    }

                    .title {
                        font-size: 2rem;
                    }

                    .generator-card,
                    .output-card {
                        padding: 1.5rem;
                    }

                    .qr-display {
                        flex-direction: column;
                    }

                    .qr-info {
                        min-width: auto;
                    }
                }

                @media (min-width: 768px) {
                    .qr-display {
                        flex-direction: row;
                        align-items: flex-start;
                    }

                    .output-header {
                        justify-content: space-between;
                    }
                }
            `}</style>

            <div className="main-content">
                <div className="header">
                    <h1 className="title">QR Code Generator</h1>
                    <p className="subtitle">Create custom QR codes instantly</p>
                </div>

                <div className="generator-card">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="form-input"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isGenerating}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isGenerating}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="content">
                            QR Code Content
                        </label>
                        <textarea
                            id="content"
                            className="form-input form-textarea"
                            placeholder="Enter text, URL, or any content for your QR code..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isGenerating}
                        />
                    </div>

                    <button 
                        className="generate-btn" 
                        onClick={handlegenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <>
                                <span className="loading-spinner"></span>
                                Generating QR Code...
                            </>
                        ) : (
                            'Generate QR Code'
                        )}
                    </button>
                </div>

                {qrImage && info && (
                    <div className="output-card">
                        <div className="output-header">
                            <h3 className="output-title">Your QR Code</h3>
                            <button className="download-btn" onClick={downloadQR}>
                                Download
                            </button>
                        </div>
                        
                        <div className="qr-display">
                            <div className="qr-image-container">
                                <img 
                                    src={qrImage} 
                                    alt="Generated QR Code" 
                                    className="qr-image"
                                />
                            </div>
                            
                            <div className="qr-info">
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Name</span>
                                        <div className="info-value">{info.name}</div>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Email</span>
                                        <div className="info-value">{info.email}</div>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Content</span>
                                        <div className="info-value">{info.text}</div>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Created</span>
                                        <div className="info-value">
                                            {new Date(info.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;