import { createSlice } from "@reduxjs/toolkit";


const filterSlice = createSlice({
    name: "filter",
    initialState: {
        name: "",
    },
    reducers: {
        changeFilter : (state, action) => { state.name = action.payload },
    }
})    


export const {changeFilter } = filterSlice.actions;
export const selectNameFilter = (state) => state.filters.name;
export default filterSlice.reducer;