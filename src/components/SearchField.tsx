import { Button, IconButton, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';




export const SearchField: React.FC = () => {
    
    return (
        <div className=" bg-slate-100/25 flex items-stretch justify-center px-6 py-2 rounded-full w-full max-w-[600px] gap-3">
            <TextField 
                label="Search" 
                variant="standard" 
                multiline
                size="small"
                fullWidth
            />
            <IconButton aria-label="delete" size="large">
                <SearchIcon fontSize="inherit" />
            </IconButton>
        </div>
    )
}