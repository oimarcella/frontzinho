
import { createSlice } from '@reduxjs/toolkit'
import { title } from 'process';
import { ReactNode } from 'react';

type ActionT = {
    isOpen?: boolean;
    bodyNode: ReactNode;
    footerNode?: ReactNode;
    hasHeader?: boolean;
    title?: string;
    hasFooter?: boolean;
}

const initialState: ActionT = {
    isOpen: false,
    hasHeader: true,
    title: "Info",
    hasFooter: false,
    bodyNode: null,
    footerNode: null
};

export const modalSlice = createSlice({
    name: 'myModal',
    initialState,
    reducers: {
        showModal(state, { payload }: { payload: ActionT }) {
            return {
                ...state,
                isOpen: true,
                hasFooter: payload.hasFooter,
                hasHeader: payload.hasHeader,
                title: payload.title,
                bodyNode: payload.bodyNode,
                footerNode: payload.footerNode
            };
        },
        closeModal(state) {
            return initialState;
        }
    },
})

export const { showModal, closeModal } = modalSlice.actions;
export const selectModal = (state: any) => state.myModal;
export default modalSlice.reducer;