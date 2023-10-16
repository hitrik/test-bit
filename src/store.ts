import { configureStore } from "@reduxjs/toolkit";
import postsReducer, { type IPostsSlice } from './features/posts/postsSlice';

export interface IStore {
    postsData: IPostsSlice;
}

export default configureStore<IStore>({
    reducer: {
        postsData: postsReducer
    }
});
