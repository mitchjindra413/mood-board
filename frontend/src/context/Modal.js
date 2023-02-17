import { createContext, useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { hideModal } from "../store/ui";
import './Modal.css'

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const modalRef = useRef()
    const [value, setValue] = useState()

    useEffect(() => {
        setValue(modalRef.current)
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext)
    const dispatch = useDispatch()
    if(!modalNode) return null

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}></div>
            <div id="modal-content">
                {children}
            <button className="close-modal" onClick={() => dispatch(hideModal())}>X</button>
            </div>
        </div>,
        modalNode
    )
}