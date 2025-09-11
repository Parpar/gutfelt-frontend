import React from 'react';
import UploadPage from './UploadPage';

function ProtokollatPage() {
    return (
        <UploadPage 
            pageTitle="Protokollat, erklæring og referat"
            category="protokollat"
            backLink="/standarder"
            backLinkText="Standarder"
            iconClass="fa-gavel"
        />
    );
}
export default ProtokollatPage;