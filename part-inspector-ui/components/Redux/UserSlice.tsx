import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    username: string | null;
}

const initialState: UserState = {
    username: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const { setUsername } = UserSlice.actions;
export default UserSlice.reducer;