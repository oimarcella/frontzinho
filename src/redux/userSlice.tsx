import { createSlice } from "@reduxjs/toolkit";

type userSliceActionT = {
    id: string;
    name: string;
    email?: string;
    jwtToken: string;
}

const initialState: userSliceActionT = {
    id: "",
    name: "",
    email: "",
    jwtToken: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, { payload }: { payload: userSliceActionT }) {
            return {
                ...state,
                id: payload.id,
                name: payload.name,
                email: payload.email,
                jwtToken: payload.jwtToken
            };
        },
        logout(state) {
            return initialState;
        }
    }
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: any) => state.user;
export default userSlice.reducer;