import React from 'react';
import UploadPage from './UploadPage';

function PersondatapolitikPage() {
    return (
        <UploadPage 
            pageTitle="Persondatapolitik"
            category="persondatapolitik"
            backLink="/firmapolitikker"
            backLinkText="Firmapolitikker"
            iconClass="fa-user-shield"
        />
    );
}
export default PersondatapolitikPage;