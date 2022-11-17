import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    viewMod: false,

}

const heroesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        notesFetched: (state, action) => {
// @ts-ignore
            state.notes.push(action.payload);
        },
        notesUpdate: (state, action) => {
// @ts-ignore
            const item = state.notes.find((item) => item.id === action.payload.id)
            console.log(item);
            if (item) {
// @ts-ignore
                item.title = action.payload.title
                // @ts-ignore
                item.body = action.payload.body
                // @ts-ignore
                item.lastModified = action.payload.lastModified
            }
        },
        setViewMod: (state, action) => {
// @ts-ignore
            state.viewMod = action.payload;
        },
        notesDeleted: (state, action) => {
            // @ts-ignore
            state.notes = state.notes.filter(item => item.id !== action.payload);
        }
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    notesFetched,
    notesDeleted,
    setViewMod,
    notesUpdate
} = actions;