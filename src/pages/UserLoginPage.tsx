import { Box, Tabs, Tab, ThemeProvider, createTheme, AlertTitle, Collapse } from "@mui/material";
import {  useCallback, useEffect, useState } from "react";
import { TabPanel } from "../components/TabPanel";
import { LogInContainer } from "../components/LogInContainer";
import { SignUpContainer } from "../components/SignUpContainer";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import Alert from '@mui/material/Alert';

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
    const {onLoginHandler, onLoginByGoogle, onRegisterHandler, error, openAlert, setOpenAlert} = useFirebaseAuth()

    const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    },[])



    useEffect(() => {
        setTimeout(() => {
            setOpenAlert(false);
        }, 6000);
    }, [openAlert])
    




    return (
        <div className="py-16 flex flex-col items-center gap-9">
            {error && (
                <Collapse in={openAlert}>
                    <Alert severity="error">
                        <AlertTitle>
                            Error
                        </AlertTitle>
                        {error.message}
                    </Alert>
                </Collapse>
            )}
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
                            indicatorColor="secondary"
                            variant="fullWidth" 
                        >
                            <Tab  
                                label={
                                    <span style={{ color: '#bae6fd' }}>
                                        Log in
                                    </span>
                                }
                            />
                            <Tab  
                                label={
                                    <span style={{ color: '#bae6fd' }}>
                                        Sign up
                                    </span>
                                }
                            />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                       <LogInContainer
                            onSendData={onLoginHandler} 
                            onHandleClickGoogle={onLoginByGoogle}
                            error={error}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <SignUpContainer 
                            onSendData={onRegisterHandler}
                            error={error}
                        />
                    </TabPanel>
                </ThemeProvider>   
            </div>
        </div>
    )
}