import { createSlice } from "@reduxjs/toolkit";


export interface User {
    id: string | null;
    email: string | null;
    password: string | null | any;
    avatar?: any | null;
}





const initialState: User = {
    id: null,
    email: null,
    password: null,
    avatar: null,
};




const userDataSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.password = action.payload.password;
            state.avatar = action.payload.avatar;
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
            state.password = null;
            state.avatar = null;
        }
    },
});



export const { setUser, removeUser } = userDataSlice.actions;

export default userDataSlice.reducer;