import { ThemeProvider, createTheme,  Collapse } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TabPanel } from "../components/tab/TabPanel";
import { LogInContainer } from "../components/userLogin/LogInContainer";
import { SignUpContainer } from "../components/userLogin/SignUpContainer";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { ErrorAlert } from "../components/errorsMessages/ErrorAlert";
import { TabsBox } from "../components/tab/TabsBox";

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

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: number) => {
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
                    <ErrorAlert errorText={error.message}/>
                </Collapse>
            )}
            <h1 className="uppercase text-xl sm:text-2xl font-extralight text-sky-200">
                Log in to get more features
            </h1>
            <div className="w-full">
                <ThemeProvider theme={theme}>
                    <TabsBox 
                        firstTabName="Log in"
                        secondTabName="Sign up"
                        onChange={handleChangeTab}
                        tabsValue={value}
                    />
                    <TabPanel 
                        value={value} 
                        index={0}
                    >
                       <LogInContainer
                            onSendData={onLoginHandler} 
                            onHandleClickGoogle={onLoginByGoogle}
                            error={error}
                        />
                    </TabPanel>
                    <TabPanel 
                        value={value} 
                        index={1}
                    >
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