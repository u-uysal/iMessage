import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chat: null,
        chatName: null,
    },
    reducers: {
        setChat: (state, action) => {
            state.chatId = action.payload.chatId;
            state.chatName = action.payload.chatName;
        },

    },
});
export const { setChat } = chatSlice.actions;
export const selectChatName = state => state.chat.chatName;
export const selectChatID = state => state.chat.chatId;
export default chatSlice.reducer;