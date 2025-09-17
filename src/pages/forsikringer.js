import React from 'react';
import UploadPage from './UploadPage';

function ForsikringerPage() {
    return (
        <UploadPage 
            pageTitle="Forsikringer og øvrige kontrakter"
            category="forsikringer"
            backLink="/samarbejdspartnere"
            backLinkText="Samarbejdspartnere"
            iconClass="fa-shield-alt"
        />
    );
}
export default ForsikringerPage;