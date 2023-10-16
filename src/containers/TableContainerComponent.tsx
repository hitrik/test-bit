import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { PostsList } from "../components/PostsList";
import { setPosts } from "../features/posts/postsSlice";
import type { IPostItem } from "../features/posts/postsSlice";
import type { IStore } from "../store";
import {getPosts} from "../services/posts";

export const TableContainer: FC = () => {
    const posts = useSelector<IStore, IPostItem[]>(({ postsData }) => postsData.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        getPosts().then(posts => dispatch(setPosts({ posts })));
    }, []);

    return <PostsList posts={posts}/>;
};
