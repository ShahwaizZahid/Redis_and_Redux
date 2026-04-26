import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, verifyOTPAPI, loginAPI } from "./authApi";
import type { SignupData, verifyData, LoginData, UserInfo } from "../../types/Auth";

interface AuthState {
    loading: boolean;
    error: string | null;
    message: string | null;
    email: string | null;
    user: UserInfo | null;
    token: string | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    message: null,
    email: null,
    user: null,
    token: null,
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

// Login Action
export const loginUser = createAsyncThunk<any, LoginData, { rejectValue: any }>(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginAPI(data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        clearMessage(state) {
            state.message = null;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.email = null;
            state.message = null;
            state.error = null;
        },
    },

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

        // Login
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload?.message;
                state.user = action.payload?.user ?? null;
                state.token = action.payload?.token ?? null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            });
    },
});

export const { clearError, clearMessage, logout } = authSlice.actions;
export default authSlice.reducer;