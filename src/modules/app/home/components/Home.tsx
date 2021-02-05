import React from 'react';
import AdminModuleBuilder from './AdminModuleBuilder';
import FrontOfficeModuleBuilder from './FrontOfficeModuleBuilder';
import HomeHeading from './HomeHeading';

export default function Home() {
    // const [moduleType, setModuleType] = React.useState(null);
    const [moduleType, setModuleType] = React.useState('admin');

    const [appSettings, setAppSettings] = React.useState({
        apps: ['admin', 'front-office'],
        locales: ['en', 'ar'],
    });

    return (
        <>
            {!moduleType && <HomeHeading disabled={appSettings === null} setModuleType={setModuleType} />}

            {moduleType == 'admin' && <AdminModuleBuilder appSettings={appSettings} />}
            {moduleType == 'front-office' && <FrontOfficeModuleBuilder appSettings={appSettings} />}
        </>
    )
} 