import { createSlice } from '@reduxjs/toolkit';

const filterByStatus = createSlice({
    name: 'FILTER_BY_STATUS',
    initialState: {
        profileArray: [],
        showBackArrow: false,
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        profileArrayUpdate: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.profileArray = [...state.profileArray, action.payload];

        },
        headerPropsUpdate: (state, action) => {
            state.showBackArrow = action.payload;

        }
    },
});

export const { profileArrayUpdate, headerPropsUpdate } = filterByStatus.actions;

export default filterByStatus.reducer;