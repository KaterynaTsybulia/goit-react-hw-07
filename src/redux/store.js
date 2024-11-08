import { configureStore } from '@reduxjs/toolkit';
import  filtersReducer  from '../redux/filtersSlice';
import  contactsReducer  from '../redux/contactsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});


