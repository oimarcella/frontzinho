
import { createSlice } from '@reduxjs/toolkit'

type ActionT = {
    isOpen: boolean;
}

const initialState: ActionT = {
    isOpen: false,
};

export const modalSlice = createSlice({
    name: 'myModal',
    initialState,
    reducers: {
        show(state) {
            console.log("show() ~ modalSlcie");
            return {
                ...state,
                isOpen: true,
            };
        },
        close(state) {
            console.log("close() ~ modalSlcie");
            return initialState;
        }
    },
})

export const { show, close } = modalSlice.actions;
export const selectModal = (state: any) => state.myModal;
export default modalSlice.reducer;