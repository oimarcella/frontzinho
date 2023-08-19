
import { createSlice } from '@reduxjs/toolkit'

type ActionT = {
    type?: string;
    message: string;
    isOpen?: boolean;
    delay?: number;
}

const initialState: ActionT = {
    type: "primary",
    message: "",
    isOpen: false,
    delay: 3000
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        show(state, { payload }) {
            let typeFormated = payload.type;
            if (payload.type && payload.type.toLowerCase() == "error") {
                typeFormated = "danger";
            }

            return {
                ...state,
                isOpen: true,
                message: payload.message,
                type: payload.type ? typeFormated : initialState.type,
                delay: payload.delay || initialState.delay
            };
        },
        close(state) {
            return initialState;
        }
    },
})

export const { show, close } = toastSlice.actions;
export const selectToast = (state: any) => state.toast;
export default toastSlice.reducer;