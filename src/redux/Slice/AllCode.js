import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCodeByStyle } from "../../services/AllCodeService";

// Tạo một action để gọi 3 API
export const fetchAllCode = createAsyncThunk(
  "data/fetchAllCode",
  async (_, { rejectWithValue }) => {
    try {
      const [ROLE, GENDER, POSITION] = await Promise.all([
        getAllCodeByStyle("ROLE"),
        getAllCodeByStyle("GENDER"),
        getAllCodeByStyle("POSITION"),
      ]);

      return {
        apiGetRole: ROLE.data,
        apiGetGender: GENDER.data,
        apiGetPosition: POSITION.data,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice để quản lý trạng thái
const dataAllCode = createSlice({
  name: "apiData",
  initialState: {
    ROLE: null,
    GENDER: null,
    POSITION: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ROLE = action.payload.apiGetRole;
        state.GENDER = action.payload.apiGetGender;
        state.POSITION = action.payload.apiGetPosition;
      })
      .addCase(fetchAllCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default dataAllCode.reducer;
