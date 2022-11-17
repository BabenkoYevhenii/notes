import { configureStore } from '@reduxjs/toolkit';
import notes from '../components/notesSlice';


const stringMiddleware = () => (next: (arg0: { type: string; }) => any) => (action: { type: string; }) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {notes},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;
