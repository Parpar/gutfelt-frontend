import React from 'react';
import UploadPage from './UploadPage';

function KickoffPage() {
    return (
        <UploadPage 
            pageTitle="Kickoff møder"
            category="kickoff"
            backLink="/firmapolitikker"
            backLinkText="Firmapolitikker"
            iconClass="fa-rocket"
        />
    );
}
export default KickoffPage;