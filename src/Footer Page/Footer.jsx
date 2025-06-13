import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={contentStyle}>
                    <div style={logoSectionStyle}>
                        <h3 style={logoStyle}>Qrafter</h3>
                        <p style={descriptionStyle}>Generate QR codes instantly</p>
                    </div>
                    
                    <div style={linksSectionStyle}>
                        <a href="#" style={linkStyle}>Privacy Policy</a>
                        <a href="#" style={linkStyle}>Terms of Service</a>
                        <a href="#" style={linkStyle}>Contact</a>
                        <a href="#" style={linkStyle}>Help</a>
                    </div>
                </div>
                
                <div style={bottomStyle}>
                    <p style={copyrightStyle}>
                        © 2024 Qrafter. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    marginTop: 'auto',
    padding: '2rem 0 1rem 0'
};

const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
};

const contentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '2rem',
    marginBottom: '1.5rem'
};

const logoSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
};

const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2563eb',
    margin: '0'
};

const descriptionStyle = {
    color: '#6b7280',
    fontSize: '0.9rem',
    margin: '0'
};

const linksSectionStyle = {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap'
};

const linkStyle = {
    color: '#6b7280',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease'
};

const bottomStyle = {
    borderTop: '1px solid #f3f4f6',
    paddingTop: '1rem',
    textAlign: 'center'
};

const copyrightStyle = {
    color: '#9ca3af',
    fontSize: '0.85rem',
    margin: '0'
};

// Add hover effect with inline styles
const FooterWithHover = () => {
    return (
        <footer style={footerStyle}>
            <style jsx>{`
                .footer-link:hover {
                    color: #2563eb !important;
                }
                
                @media (max-width: 768px) {
                    .footer-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 1.5rem;
                    }
                    
                    .footer-links {
                        justify-content: center;
                    }
                }
            `}</style>
            
            <div style={containerStyle}>
                <div style={contentStyle} className="footer-content">
                    <div style={logoSectionStyle}>
                        <h3 style={logoStyle}>Qrafter</h3>
                        <p style={descriptionStyle}>Generate QR codes instantly</p>
                    </div>
                    
                    <div style={linksSectionStyle} className="footer-links">
                        <a href="#" style={linkStyle} className="footer-link">Privacy Policy</a>
                        <a href="#" style={linkStyle} className="footer-link">Terms of Service</a>
                        <a href="#" style={linkStyle} className="footer-link">Contact</a>
                        <a href="#" style={linkStyle} className="footer-link">Help</a>
                    </div>
                </div>
                
                <div style={bottomStyle}>
                    <p style={copyrightStyle}>
                        © 2024 Qrafter. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterWithHover;