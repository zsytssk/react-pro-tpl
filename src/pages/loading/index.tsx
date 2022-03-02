import { useEffect } from 'react';

import { log } from '@app/utils/logger';

export default function Loading() {
    useEffect(() => {
        log(`loading`);
    }, []);

    return <div>loading...</div>;
}
