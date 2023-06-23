import SearchIcon from '@mui/icons-material/Search';
import { List, ListItem, IconButton, Input, ListItemButton, ListItemText } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";



interface SearchFieldProps {
    onChangeInputValue: (e:React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    onSubmitData: (event: React.FormEvent<HTMLFormElement>) => void;
    onChooseCityAutocomplete: (cityItem: string) => void;
    listIsOpen: boolean;
    placePredictions:google.maps.places.AutocompletePrediction[];
    isPlacePredictionsLoading:boolean;
}




export const SearchField: React.FC<SearchFieldProps> = (
    {onChangeInputValue, inputValue, onSubmitData, onChooseCityAutocomplete, listIsOpen,  placePredictions, isPlacePredictionsLoading }) => {

    const API_KEY = import.meta.env.VITE_PLACES_API_KEY;

    const { ref } = usePlacesWidget({
        apiKey: API_KEY,
        // options: {
        //     types: ["(regions)"],
        // },
        language: 'en',
    })

   
   
    
    return (
         <div className="w-full max-w-[600px] flex flex-col items-center gap-7 relative">
            
            <form 
                action="" 
                className=" bg-slate-100/25 flex items-stretch justify-center px-6 py-2 rounded-full w-full max-w-[600px] gap-3 border "
                onSubmit={onSubmitData}
            >
                <Input
                    placeholder="Search..."
                    ref={ref}
                    className="w-full caret-slate-50 text-slate-50"
                    value={inputValue}
                    onChange={onChangeInputValue}
                />
                <IconButton 
                    aria-label="search" 
                    size="large"
                    type="submit"
                >
                    <SearchIcon fontSize="inherit" />
                </IconButton>
            </form>

            {placePredictions?.length > 0 && listIsOpen && (
                <div className="border rounded-lg w-full max-w-[600px] bg-slate-500/90 absolute left-0 right-0 top-24 z-10">
                    {!isPlacePredictionsLoading && (
                        <List>
                            {placePredictions.map((item) => (
                                    <ListItem 
                                        disablePadding 
                                        className="text-sky-50 border-b border-b-sky-100 last:border-0 first:bg-slate-600/90" 
                                        onClick={() => onChooseCityAutocomplete(item.description)}
                                        key={item?.place_id}
                                    >
                                        <ListItemButton>
                                            <ListItemText primary={item.description}/>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </List>
                    )}
                </div>
            )}
        </div>
    )
}