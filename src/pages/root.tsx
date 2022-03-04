import { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { Link, Switch, useHistory, useLocation } from 'react-router-dom';

import { formatLang, setLang } from '@app/constants/i18n';

export default function Root(props: any) {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const { pathname, search, hash } = location;
        const pathLang = pathname.split('/')[1];
        const lang = formatLang(pathLang);
        if (lang) {
            const newPath = location.pathname.replace(`/${pathLang}`, '');
            history.replace(`${newPath}${search}${hash}`);
            setLang(lang);
        }
    }, [history, location]);

    return (
        <>
            root
            <Link to={`/loading`}>loading</Link>
            <Switch>{renderRoutes(props.route.routes)}</Switch>
        </>
    );
}
