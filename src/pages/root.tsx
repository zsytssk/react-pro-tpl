import { useEffect } from 'react';
import {
    Link,
    Route,
    useLocation,
    useRoutes,
    useNavigate,
} from 'react-router-dom';

import { formatLang, setLang } from '@app/constants/i18n';
import { routes } from '@app/routes/app.routes';

export default function Root(props: any) {
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
    }, [history, location]);

    return (
        <>
            root
            <Link to={`/loading`}>loading</Link>
            {useRoutes(routes)}
        </>
    );
}
