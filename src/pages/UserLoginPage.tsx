import { Box, AppBar, Tabs, Tab, Typography, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../components/TabPanel";
import { LogInContainer } from "../components/LogInContainer";
import { SignUpContainer } from "../components/SignUpContainer";

const theme = createTheme({
    palette: {
        primary: {
            main: '#b3e5fc',
        },
        secondary: {
            main: '#fde68a',
        },
    },
});


export const UserLogin: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="py-16 flex flex-col items-center gap-9">
            <h1 className="uppercase text-xl sm:text-2xl font-extralight text-sky-200">
                Log in to get more features
            </h1>
            <div className="w-full">
                <ThemeProvider theme={theme}>
                    <Box sx={{ borderBottom: 1, borderColor: '#e3f2fd', width: '100%' }}>
                        <Tabs 
                            value={value} 
                            onChange={handleChange} 
                            centered 
                            textColor="secondary"
                            variant="fullWidth" 
                        >
                            <Tab label="Log in"/>
                            <Tab label="Sign up"/>
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                       <LogInContainer/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SignUpContainer/>
                    </TabPanel>
                </ThemeProvider>   
            </div>
        </div>
    )
}