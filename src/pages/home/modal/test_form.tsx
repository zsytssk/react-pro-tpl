import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Modal from '@app/libs/bitUi/Modal';
import { log } from '@app/utils/logger';

import styles from './test_form.less';

export function TestForm({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose?: () => void;
}) {
    const [state, setState] = useState(false);
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = (data) => {
        log(data);
    };

    return (
        <Modal visible={visible} className={styles.testModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="email"
                    ref={register({
                        required: 'value is required',
                        validate: (value) => {
                            if (
                                value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
                            ) {
                                return true;
                            }
                            return 'pattern is not match';
                        },
                    })}
                />
                {errors.email && (
                    <p style={{ color: 'red' }}>{errors.email.message}</p>
                )}
                <br />
                <input type="submit" value="submit" />
            </form>
        </Modal>
    );
}
