import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, verifyOTPAPI } from "./authApi";
import type { SignupData, verifyData } from "../../types/Auth";

interface AuthState {
    loading: boolean;
    error: string | null;
    message: string | null;
    email: string | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    message: null,
    email: null,
};

// Signup Action
export const signupUser = createAsyncThunk<any, SignupData, { rejectValue: any }>(
    "auth/signupUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await signupAPI(data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

// Verify OTP Action
export const verifyOTP = createAsyncThunk<any, verifyData, { rejectValue: any }>(
    "auth/verifyOTP",
    async (data, { rejectWithValue }) => {
        try {
            const response = await verifyOTPAPI(data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},

    extraReducers: (builder) => {

        // Signup
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload?.message;

                // store email for OTP verification
                state.email = action.meta.arg.email;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Signup failed";
            });

        // Verify OTP
        builder
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload?.message;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Verification failed";
            });
    },
});

export default authSlice.reducer;