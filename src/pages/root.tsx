import { Suspense, useEffect } from 'react';
import {
    Link,
    Route,
    useLocation,
    useRoutes,
    useNavigate,
} from 'react-router-dom';

import { formatLang, setLang } from '@app/constants/i18n';
import { routes } from '@app/routes/app.routes';

export default function Root() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const { pathname, search, hash } = location;
        const pathLang = pathname.split('/')[1];
        const lang = formatLang(pathLang);
        if (lang) {
            const newPath = location.pathname.replace(`/${pathLang}`, '');
            navigate(`${newPath}${search}${hash}`);
            setLang(lang);
        }
    }, [navigate, location]);

    return <div>{useRoutes(routes)}</div>;
}
