import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isModalActive: false,
  postId: null,
  posts: [],
};

const getReqBody = (StartDate) => {
  console.log("MOnth", StartDate.getMonth(), StartDate);
  const token =
    StartDate !== undefined
      ? {
          sorton: "calendardatetime, createdontimestamp",
          token: `${StartDate.getDate()}-${
            StartDate.getMonth() + 1
          }-${StartDate.getFullYear()} ${StartDate.getHours()}:${StartDate.getMinutes()}:${StartDate.getSeconds()}.${StartDate.getMilliseconds()}|04-12-2020 18:31:47.261956`,
        }
      : null;
  console.log(token);
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

export const fetchMorePosts = createAsyncThunk(
  "calendar/posts",
  async (date, { getState }) => {
    const newDate = new Date(date);
    console.log(newDate);
    try {
      const body = getReqBody(newDate);
      const response = await axios.post(`http://devapi.quinn.care/graph`, body);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isModalActive = false;
      state.postId = null;
      state.isEndReadched = false;
    },
    openModal: (state, action) => {
      state.posts = action.payload.posts;
      state.postId = action.payload.id;
      state.isModalActive = true;
    },
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
  extraReducers: {
    [fetchMorePosts.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload?.responseobjects[0]?.posts) {
        const initialPosts = state.posts;
        const NewFetchedPosts = action.payload.responseobjects[0].posts;

        const mergedPosts = initialPosts.concat(NewFetchedPosts);

        const removeDuplicates = mergedPosts.reduce((acc, current) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        if (state.posts.length === removeDuplicates.length) {
          state.isEndReadched = true;
        } else {
          state.posts = removeDuplicates;
        }
      } else {
        state.isEndReadchedState = true;
      }
    },
    [fetchMorePosts.rejected]: (state, action) => {
      console.log("REjected");
    },
  },
});

export const { closeModal, openModal, setPostId } = modalSlice.actions;
export const getModalState = (state) => state.modal.isModalActive;
export const getPostId = (state) => state.modal.postId;
export const getPosts = (state) => state.modal.posts;

export default modalSlice.reducer;
