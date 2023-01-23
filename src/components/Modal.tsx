import React from "react";

interface ModalProps {
    children: React.ReactNode
    title: string
    onClose: () => void
    className: string
}


export function Modal({ children, title, onClose, className }: ModalProps) {
    return (
        <>
            <div className={'fixed bg-black/50 top-0 right-0 left-0 bottom-0'} onClick={onClose}>
            </div>
            <div className={className}>
                <h1 className="text-2xl text-center mb-2">{ title }</h1>
                { children }
            </div>
        </>
    );
}