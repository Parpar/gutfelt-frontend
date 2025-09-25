import React from 'react';
import UploadPage from './UploadPage';

function HvidvaskPage() {
    return (
        <UploadPage 
            pageTitle="Hvidvask"
            category="hvidvask"
            backLink="/firmapolitikker"
            backLinkText="Firmapolitikker"
            iconClass="fa-balance-scale-left"
        />
    );
}
export default HvidvaskPage;