// SwitchView.tsx
import React from 'react';
import { Switch } from '@mui/material';
import { applicationEnum } from '../../constants/applicationEnum';
import { useSelector } from 'react-redux';

interface SwitchViewProps {
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  onToggle?: (checked: boolean) => void;
  checked: boolean;
}

const SwitchView: React.FC<SwitchViewProps> = ({
  checkedIcon,
  uncheckedIcon,
  onToggle,
  checked = false
}) => {
  const currentTheme = useSelector((state: any) => state.ui.theme);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle?.(event.target.checked);
  };

  return (
    <Switch
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: currentTheme === applicationEnum.THEME_ENUM.LIGHT ? '#fff' : '',
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: currentTheme === applicationEnum.THEME_ENUM.LIGHT ? '#fff' : '',
        },
      }}
      checked={checked}
      icon={uncheckedIcon}
      checkedIcon={checkedIcon}
      onChange={handleChange}
    />
  );
};

export default SwitchView;
