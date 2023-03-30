import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

interface ITabsComponent {
	tabs: { title: string; element: JSX.Element }[];
}
const TabsComponent: FunctionComponent<ITabsComponent> = ({ tabs }) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	function a11yProps(index: number) {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`,
		};
	}

	return (
		<Box>
			<Box>
				<Tabs value={value} onChange={handleChange} variant="fullWidth">
					{tabs.map((tab, index) => (
						<Tab key={`${tab.title}${index}`} label={tab.title} {...a11yProps(index)} />
					))}
				</Tabs>
			</Box>
			{tabs.map((tab, index) => (
				<TabPanel key={index} value={value} index={index}>
					{tab.element}
				</TabPanel>
			))}
		</Box>
	);
};

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}
const TabPanel: FunctionComponent<PropsWithChildren<TabPanelProps>> = ({ children, value, index, ...other }) => {
	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && children}
		</div>
	);
};

export default TabsComponent;
