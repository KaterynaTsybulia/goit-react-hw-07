import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "./filtersSlice";

function handlePending (state){
    state.loading = true;
    state.error = false;
}

function handleRejected (state){
    state.loading = false;
    state.error = true;
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        items: [], 
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handlePending)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchContacts.rejected, handleRejected)
            .addCase(addContact.pending, handlePending)
            .addCase(addContact.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.loading = false;
                state.error = null;

            })
            .addCase(addContact.rejected, handleRejected)
            .addCase(deleteContact.pending, handlePending)
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteContact.rejected, handleRejected)
    }
    })    


export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;


export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, filter) => {
        return contacts.filter((contact) =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
        );
    }
);

export default contactsSlice.reducer;