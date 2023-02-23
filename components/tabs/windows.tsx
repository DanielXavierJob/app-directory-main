import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}
export default function Windows({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [value, setValue] = React.useState<any>(0);
    const [tabs, setTabs] = React.useState([
        <Tab label="Item One" value={0} key={0} />,
        <Tab label="+" value={'+'} key={1} />
    ]);
    const [childrens, setChildrens] = React.useState([{key: 0, component: children}])
    const handleChange = (event: React.SyntheticEvent, newValue: number | string) => {
        console.log(newValue)
        if (newValue == "+") {
            AddTabs(<h1>`Olaaaaa ${Math.floor(Math.random() * 89999999)}`</h1>)
        } else {
            setValue(newValue);
        }
    };


    const AddTabs = (children: JSX.Element ) => {
        const data = tabs;
        const key = Math.floor(Math.random() * 89999999)
        data.splice(data.length -1,0,<Tab label={"Item "+key} value={key} key={key}/>)
        setTabs([...data])
        setChildrens([...childrens, {key: key, component: children}])
    }

    return (
        <div>
            <Box sx={{ bgcolor: 'background.paper' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tabs}

                </Tabs>
            </Box>
            {/* {children} */}
            {childrens.find((item) => item.key === value)?.component}

        </div>
    )
}