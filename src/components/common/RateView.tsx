import React, { useState } from 'react';
import { Rate } from 'antd';

interface RateViewProps {
    label: string;
    defaultValue?: number;
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
}

const RateView: React.FC<RateViewProps> = ({
    label,
    defaultValue = 0,
    value,
    onChange,
    disabled = false,
}) => {

    return (
        <div>
            <span className='me-3'>{label}</span>
            <Rate
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                disabled={disabled}
                allowHalf
            />
        </div>
    );
};

export default RateView;
