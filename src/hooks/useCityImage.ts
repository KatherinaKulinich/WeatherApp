import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { fetchSavedCitiesData } from "../rdx/slices/savedSlice"
import { useAppDispatch, useAppSelector } from "./hooks"
import { useAuth } from "./useUserAuthData"



export const useCityImage = () => {
    const [imgErr, setImgErr] = useState('')
    const dispatch = useAppDispatch();
    const { id : userId } = useAuth();
    const { cityName } = useAppSelector(state => state.locationData)

    const API_KEY = import.meta.env.VITE_PLACES_API_KEY;
    const API_URL = import.meta.env.VITE_PLACES_API_URL;
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    let imgRef:string = '';
    let documentId:string = '';


    const getLinkFromRef = (ref:string) => {
        return `${API_URL}photo?maxwidth=700&maxheight=700&photo_reference=${ref}&key=${API_KEY}`
    }





    const getCityBgImage = () => {
        setImgErr('')

        const URL = `${proxyURL}${API_URL}textsearch/json?query=${cityName}&type=tourist_attraction&key=${API_KEY}`
        imgRef = ''
        documentId = ''
        
        

        fetch(URL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
        }) 
        .then(response => {

            if(response.ok) {
                return response.json()
            }
            throw new Error('Something went wrong');
        })
        .then((data )=> {
            
            if (data?.results[0]?.photos[0]?.photo_reference) {
                imgRef = data?.results[0]?.photos[0]?.photo_reference
                return imgRef
            }
            throw new Error('Something went wrong');
        })
        .then(async() => {
  
            if (userId) {
                const citiesRef = collection(db, 'users', userId,  'saved')
                const q = query(citiesRef, where('cityName', '==', `${cityName}`))
                const querySnapshot = await getDocs(q);
                
                
                querySnapshot.forEach((doc) => {
                    console.log(doc.data());
                    documentId = doc.id
                });

                if (documentId) {
                    await updateDoc(doc(db, 'users', userId, 'saved', documentId), {
                        image: getLinkFromRef(imgRef) 
                    })
                }
                await dispatch(fetchSavedCitiesData(userId))
            }  
        })
        .catch(error => {
            setImgErr(error.message)
        })

    }

    useEffect(() => {
        getCityBgImage()
    },[cityName, documentId, imgRef])


    
    
    return {
        imgErr,
        getCityBgImage,
    }
}