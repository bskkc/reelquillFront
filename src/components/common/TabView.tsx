import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ButtonView from './ButtonView';
import uiConstantsTR from '../../constants/uiConstantsTR';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabViewProps {
  tabs: { label: string; component: React.ReactNode }[];
  onClickAddQuill?: () => void;
}

export default function TabView({ tabs, onClickAddQuill }: TabViewProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ flexGrow: 1, marginLeft: "1rem" }}>
          {tabs.map((tab, index) => (
            <Tab sx={{ color: '#fff' }} label={tab.label} {...a11yProps(index)} key={index} />
          ))}
        </Tabs>
        <div className='add-quill-btn justify-content-end'>
          <ButtonView label={uiConstantsTR.HOME_PAGE.ADD_QUILL} onClickCallback={onClickAddQuill} />
        </div>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
