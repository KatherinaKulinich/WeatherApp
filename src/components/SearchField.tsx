import { IconButton, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';



interface SearchFieldProps {
    onChangeInput: (e:React.ChangeEvent<HTMLInputElement>) => void;
    inputValue: string;
    onSubmitData: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({onChangeInput, inputValue, onSubmitData}) => {
   
    
    return (
        <form 
            className=" bg-slate-100/25 flex items-stretch justify-center px-6 py-2 rounded-full w-full max-w-[600px] gap-3"
            onSubmit={onSubmitData}
        >
            <TextField 
                label="Search" 
                variant="standard" 
                multiline
                size="small"
                fullWidth
                onChange={onChangeInput}
                value={inputValue}
            />
            <IconButton 
                aria-label="delete" 
                size="large"
                type="submit"
            >
                <SearchIcon fontSize="inherit" />
            </IconButton>
        </form>
    )
}