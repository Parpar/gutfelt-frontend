import React from 'react';
import UploadPage from './UploadPage';

function KvalitetsstyringPage() {
    return (
        <UploadPage 
            pageTitle="Kvalitetsstyringsmanuel"
            category="kvalitetsstyring"
            backLink="/firmapolitikker"
            backLinkText="Firmapolitikker"
            iconClass="fa-check-double"
        />
    );
}
export default KvalitetsstyringPage;