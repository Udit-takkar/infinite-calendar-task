import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
};

const getReqBody = (StartDate) => {
  const token =
    StartDate !== undefined
      ? {
          sorton: "calendardatetime, createdontimestamp",
          token: `1-${StartDate.getMonth()}-${StartDate.getFullYear()} 00:00:00.000000|04-12-2020 18:31:47.261956`,
        }
      : null;
  return {
    requestobjects: [
      {
        posts: {
          operationtype: "read",
          id: {
            return: true,
          },
          userid: {
            searchvalues: ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
            return: true,
          },
          iscalendarentry: {
            searchvalues: ["true"],
            return: true,
          },
          media: {
            return: true,
          },
          rating: {
            return: true,
          },
          text: {
            return: true,
          },
          privacy: {
            searchvalues: [18],
            return: true,
          },
          typeofday: {
            return: true,
          },

          calendardatetime: {
            return: true,
            sort: "ascending",
          },
          maxitemcount: "20",
          continuationtoken: token,
        },
      },
    ],
  };
};

export const fetchPosts = createAsyncThunk(
  "calendar/posts",
  async (date, { getState }) => {
    console.log(date);
    try {
      const body = getReqBody(new Date(date));
      const response = await axios.post(`http://devapi.quinn.care/graph`, body);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
);

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      console.log("Pending request");
    },
    [fetchPosts.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload?.responseobjects[0]?.posts)
        state.posts = action.payload.responseobjects[0].posts;
    },
    [fetchPosts.rejected]: (state, action) => {
      Object.assign(state, {
        posts: [],
      });
    },
  },
});

// export const { toggleModalState } = modalSlice.actions;
export const getPosts = (state) => state.calendar.posts;

export default calendarSlice.reducer;
