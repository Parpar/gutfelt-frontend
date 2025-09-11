import React from 'react';
import UploadPage from './UploadPage';

function MandagsmøderPage() {
    return (
        <UploadPage 
            pageTitle="Mandagsmøder"
            category="mandagsmøder"
            backLink="/firmapolitikker"
            backLinkText="Firmapolitikker"
            iconClass="fa-calendar-week"
        />
    );
}
export default MandagsmøderPage;