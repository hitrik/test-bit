import { createSlice } from '@reduxjs/toolkit';

export interface IPostItem {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IPostsSlice {
    posts: IPostItem[],
    isLoading: boolean
}

const initialState: IPostsSlice = {
    posts: [],
    isLoading: false
};


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload.posts;
        },
        deletePost(state, action) {
            const { postIds } = action.payload;
            Object.assign(state.posts, state.posts.filter(post => !postIds.includes(post.id)));
        },
        addPosts(state, action) {
            const { posts } = action.payload;
            state.posts.unshift(...posts);
        }
    }
});

export const { setPosts, deletePost, addPosts } = postsSlice.actions;
export default postsSlice.reducer;
