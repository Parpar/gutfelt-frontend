import React from 'react';
import UploadPage from './UploadPage';

function SlettepolitikPage() {
    return (
        <UploadPage 
            pageTitle="Slettepolitik"
            category="slettepolitik"
            backLink="/firmapolitikker"
            backLinkText="Firmapolitikker"
            iconClass="fa-trash-alt"
        />
    );
}
export default SlettepolitikPage;