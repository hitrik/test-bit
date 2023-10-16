import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import ModalWindow from "./ModalWindow";
import {deletePost} from "../features/posts/postsSlice";
import {useDispatch} from "react-redux";
import {TableButton} from "./TableButton";
import type {IPostItem} from "../features/posts/postsSlice";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface PostsListProps {
    posts: IPostItem[];
}

export const PostsList: FC<PostsListProps> = ({posts}) => {

    const gridRef = useRef<AgGridReact | null>(null);
    const modalWindowController = useRef();
    const dispatch = useDispatch();
    const containerStyle = useMemo(() => ({width: '100%', height: '100%'}), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);

    const [columnDefs] = useState([
        {field: 'userId', maxWidth: 80, type: 'numericColumn',},
        {
            field: 'title', flex: 1, minWidth: 100, cellStyle: {
                textAlign: 'left'
            }
        },
        {
            field: 'body', flex: 3, minWidth: 120, cellStyle: {
                textAlign: 'left'
            }
        },
    ]);

    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true
    }), []);

    const onAddRow = useCallback(({
                                      userId, title, body
                                  }) => {
        if (![userId && title && body].every(item => Boolean(item?.trim()))) {
            return;
        }
        const addIndex = 0;
        const id = (posts.at(-1)?.id ?? 0) + 1;
        const newItems: IPostItem[] = [{
            id,
            userId: Number(userId),
            title,
            body
        }];
        gridRef.current?.api.applyTransaction({
            add: newItems,
            addIndex: addIndex,
        });

    }, []);

    const toggleModal = () => modalWindowController.current?.toggle();

    const onRemoveSelected = useCallback(() => {
        let isDelete = false;
        const selectedData = gridRef.current?.api.getSelectedRows();
        const count = selectedData?.length ?? 0;

        if (count > 0) {
            isDelete = window.confirm(`Вы действительно хотите удалить строк${count > 1 ? 'и' : 'у'}?`);
        }

        if (isDelete) {
            const action = deletePost({postIds: selectedData?.map(selected => selected.id)});
            dispatch(action);
        }

    }, []);

    return (<>
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <div className="table-buttons">
                    <TableButton onClick={onRemoveSelected}>Delete selected</TableButton>
                    <TableButton onClick={toggleModal}>Add row</TableButton>
                    <ModalWindow ref={modalWindowController} onAddRow={onAddRow}/>
                </div>
                <AgGridReact
                    ref={gridRef}
                    rowData={posts}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    rowSelection='multiple'
                />
            </div>
        </div>
    </>);
};
