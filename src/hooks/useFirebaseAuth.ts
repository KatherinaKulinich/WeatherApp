
import { GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../rdx/slices/userDataSlice";
import { useAppDispatch } from "./hooks";






export const useFirebaseAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [openAlert, setOpenAlert] = useState<boolean>(true);
    const [error, setError] = useState<ErrorType>(null)

    
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    
  



    const onSaveEmail = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }, [])

    const onSavePassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }, [])






    const onRegisterHandler = (event:React.MouseEvent<HTMLButtonElement>, email:string, password:string) => {
        event.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    password: user.refreshToken,
                }));
                navigate('/')
            })
            .catch((error:Error) => {
                setError(error)
                setOpenAlert(true)
            })
    }




    const onLoginHandler = useCallback((event:React.MouseEvent<HTMLButtonElement>, email:string, password:string) => {
        event.preventDefault();
        
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                password: user.refreshToken,
            }));
            navigate(-1)
        })
        .catch((error:Error) => {
            setError(error)
            setOpenAlert(true)
        });

    }, [])




    

    const onLoginByGoogle = useCallback(() => {

        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            dispatch(setUser({
                email: user.email,
                id: user.uid,
                password: token,
                avatar: user.photoURL,
                fullName: user.displayName,
            }));
            navigate(-1)
        })
        .catch((error:Error) => {
            setError(error)
            setOpenAlert(true)
        });
    }, [])

    


    return {
        onRegisterHandler,
        onLoginHandler,
        onLoginByGoogle,
        email,
        password, 
        onSaveEmail,
        onSavePassword,
        error,
        openAlert,
        setOpenAlert,
        setError,
    }
}