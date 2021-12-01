import { css } from "@emotion/css";
import React from "react";
import ReferenceStore from "../data/ReferenceStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

const dialog = css`
  position: absolute;
  outline: none;
  border: none;
  padding: 0;
  width: min(800px, 100%);
  height: min(600px, 100%);
  top: calc(50% - 300px);
  background-color: #fff;
  border-radius: 20px;
  pointer-events: auto;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 4px 40px rgba(10, 10, 40, 0.4);
  opacity: 1;
  display: block;
  z-index: 100;

  &.closed {
    opacity: 0;
    transform: translateY(100px) rotate(-2deg);
    pointer-events: none;
  }

  @media (max-width: 600px) {
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 0;
  }
`;

const reference = css`
  padding-left: 20px;
  text-indent: -20px;
`;

export default function Citations({ open, onClose }: Props) {
  return (
    <dialog
      open={open}
      className={[dialog, open ? "open" : "closed"].join(" ")}
    >
      <button onClick={onClose}>Close</button>
      <h2>Citations</h2>
      {ReferenceStore.all.map(({ full, id }) => (
        <p className={reference} key={id}>
          {full}
        </p>
      ))}
    </dialog>
  );
}
