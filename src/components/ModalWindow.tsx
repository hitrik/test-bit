import React, {FC, forwardRef, useImperativeHandle, useRef, useState} from 'react';
import './modal-window.css';
import {TableButton} from "./TableButton";

const ModalWindow: FC<{ onAddRow: ({ userId, title, body}: { userId: string, title: string, body: string}) => void }> = ({ onAddRow }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef(null);
    const userIdRef = useRef<HTMLInputElement | null>();
    const titleRef = useRef<HTMLInputElement | null>();
    const bodyRef = useRef<HTMLInputElement | null>();

    useImperativeHandle(ref, () => ({
        hide() {
            setIsVisible(false);
        },
        toggle() {
            setIsVisible(currentState => !currentState);
        }
    }));

    const onClose = () => ref.current?.hide();

    const onClickAddButton = () => {
        onAddRow({
            userId: userIdRef.current?.value ?? '',
            title: titleRef.current?.value ?? '',
            body: bodyRef.current?.value ?? ''
        });
    };

    return isVisible ? <div ref={modalRef} className="modal-window">
                <div onClick={onClose} className="modal-window__close-btn">&times;</div>
                <div className="modal-window__header">Добавить строку в таблицу</div>
                <section className="modal-window__content">
                    <div className="modal-window__add-item-content">
                        <label htmlFor="user-id">User ID:</label>
                        <input ref={userIdRef} name="user-id" type="number"/>
                    </div>
                    <div className="modal-window__add-item-content">
                        <label htmlFor="title">Title:</label>
                        <input ref={titleRef} name="title" type="text"/>
                    </div>
                    <div className="modal-window__add-item-content">
                        <label htmlFor="body">Body:</label>
                        <input ref={bodyRef} name="body" type="text"/>
                    </div>
                </section>
                <footer className="modal-window__footer">
                    <TableButton onClick={onClickAddButton}>Добавить строку</TableButton>
                </footer>
            </div> : null;
}

export default forwardRef(ModalWindow);
