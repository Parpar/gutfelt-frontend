import React from 'react';
import UploadPage from './UploadPage';
function PersondatapolitikPage() { return <UploadPage pageTitle="Persondatapolitik" category="persondatapolitik" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-user-shield" />; }
export default PersondatapolitikPage;
```*   **`slettepolitik.js`**:
```jsx
import React from 'react';
import UploadPage from './UploadPage';
function SlettepolitikPage() { return <UploadPage pageTitle="Slettepolitik" category="slettepolitik" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-trash-alt" />; }
export default SlettepolitikPage;