import React, { CSSProperties } from "react";
import { isString } from 'lodash';
import { Modal } from 'antd';

const style: CSSProperties = {
    maxWidth: 400,
    wordBreak: 'break-all',
    whiteSpace: 'break-spaces'
}

const fontStyle: CSSProperties = {
    fontSize: '12px'
}

export default ({ t, val }) => {
    const txt = isString(val) ? val : val ? JSON.stringify(val || '') : '';

    return (
        <span style={style}>
            {txt?.length > 75 && (
                <span>
                    {txt.slice(0, 75).concat('...')}
                    <a
                        style={fontStyle}
                        onClick={() => {
                            Modal.info({
                                title: null,
                                content: (
                                    <span
                                        style={{ ...fontStyle, display: 'inline-block', overflowY: 'auto', maxHeight: 500 }}
                                    >
                                        {txt}
                                    </span>
                                ),
                                width: 760,
                                centered: true,
                                icon: null,
                                okText: t('close'),
                                maskClosable: true,
                            });
                        }}
                    >
                        {t('common:view-all')}
                    </a>
                </span>
            )}
            {txt?.length <= 75 && txt}
            {!txt?.length && '--'}
        </span>
    );
}
