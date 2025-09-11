import React from 'react';
import UploadPage from './UploadPage';

function HabilitetPage() {
    return (
        <UploadPage 
            pageTitle="Habilitet og hvidvask"
            category="habilitet"
            backLink="/standarder"
            backLinkText="Standarder"
            iconClass="fa-balance-scale"
        />
    );
}
export default HabilitetPage;