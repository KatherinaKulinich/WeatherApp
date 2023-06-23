import { Box, Tabs, Tab } from "@mui/material"


interface TabsBoxProps {
    firstTabName:string;
    secondTabName: string;
    tabsValue: number;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
}




export const TabsBox:React.FC<TabsBoxProps> = ({firstTabName, secondTabName, tabsValue, onChange}) => {


    return (
        <Box sx={{ borderBottom: 1, borderColor: '#e3f2fd', width: '100%' }}>
            <Tabs 
                value={tabsValue} 
                onChange={onChange} 
                centered 
                textColor="secondary"
                indicatorColor="secondary"
                variant="fullWidth" 
            >
                <Tab  
                    label={
                        <span style={{ color: '#bae6fd' }}>
                            {firstTabName}
                        </span>
                    }
                />
                <Tab  
                    label={
                        <span style={{ color: '#bae6fd' }}>
                            {secondTabName}
                        </span>
                    }
                />
            </Tabs>
        </Box>
    )
}