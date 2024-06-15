import React from 'react';

const Footer = () => {
    return (
        <footer style={ footerStyle }>
            <p>&copy; 2024 Demo Blog-App. All rights reserved.</p>
        </footer>
    );
};


const footerStyle = {
    textAlign: 'center',
    fontWeight: 500,
    padding: '1rem',
    width: '100%',
};

export default Footer;
