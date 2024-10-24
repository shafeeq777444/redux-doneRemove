import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const thunkPosting = createAsyncThunk("api/thunkPosting", async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post("http://localhost:3500/texts", data);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        // this return move into payload,rejectWithValue is a function
        return rejectWithValue(error.response.data);
    }
});

export const thunkFetching = createAsyncThunk("api/thunkFetching", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("http://localhost:3500/texts");
        // console.log(response.data,"getTIme");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const thunkDeleting = createAsyncThunk("api/thunkDeleting", async (id) => {
    try {
        const response= await axios.delete(`http://localhost:3500/texts/${id}`);
        // return response in this ocur a warning message we want to retun we write
return response.data
    } catch (error) {
        rejectWithValue(error.response.data);
    }
});

