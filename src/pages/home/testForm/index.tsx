import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Modal from '@app/libs/bitUi/Modal';
import { log } from '@app/utils/logger';

import styles from './style.module.less';

export function TestForm({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose?: () => void;
}) {
    const [state, setState] = useState(false);
    const { handleSubmit, register } = useForm();
    const onSubmit = (data) => {
        log(data);
    };

    return (
        <Modal visible={visible} className={styles.testModal}>
            <button onClick={onClose}>close</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="submit" value="submit" />
            </form>
        </Modal>
    );
}
