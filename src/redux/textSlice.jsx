import { createSlice } from "@reduxjs/toolkit";
import { thunkDeleting, thunkFetching, thunkPosting } from "./thunk";
const textSlice = createSlice({
    name: "text",
    initialState: {
        value: "",
        status: "",
        texts: [],
        done: [],
    },
    reducers: {
        // in this time reducer function is automatically created action.type="text/ssetTime"
        setText: (preState, action) => {
            preState.value = action.payload;
        },
        setDone: (preState, action) => {
             
                preState.done.push(action.payload);
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkPosting.fulfilled, (prestate, action) => {
                prestate.status = "success";
                console.log(action.payload);
            })
            .addCase(thunkPosting.rejected, (prestate, action) => {
                prestate.status = "failed";
                console.log("failed");
                console.log(action.payload);
            })
            .addCase(thunkPosting.pending, (prestate) => {
                prestate.status = "pending";
            })
            .addCase(thunkFetching.fulfilled, (prestate, action) => {
                prestate.status = "success";
                prestate.texts = action.payload;
                // console.log(action.payload);
            })
            .addCase(thunkFetching.pending, (prestate) => {
                prestate.status = "loading";
            })
            .addCase(thunkFetching.rejected, (prestate, action) => {
                prestate.status = "failed";
                console.log("failed");
                console.log(action.payload);
            })
            
    },
});
export const { setText, setDone } = textSlice.actions;
export default textSlice.reducer;
