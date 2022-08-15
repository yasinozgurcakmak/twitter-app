import { createPortal } from "react-dom";
import s from "./Modal.module.scss";

const modalRoot = document.querySelector("#modal-root");

function Overlay({ onClick }) {
  return <div onClick={onClick} tabIndex={1} className={s.overlay}></div>;
}

function ModalContainer({ children }) {
  return <div className={s.modalContainer}>{children}</div>;
}

function Modal({ children, isOpen = false, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <ModalContainer>
      <Overlay onClick={onClose} />
      <div className={s.childContainer}>{children}</div>
    </ModalContainer>,
    modalRoot
  );
}

export default Modal;
