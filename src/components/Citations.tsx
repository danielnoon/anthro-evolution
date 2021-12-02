import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
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
  left: calc(50% - 400px);
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

  @media (max-width: 800px) {
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

const closeButton = css`
  position: absolute;
  top: 0.75em;
  font-size: 2rem;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #aaa;
  z-index: 100;

  &:active,
  &:hover {
    border: 1px solid transparent;
    box-shadow: 0 0 6px rgba(10, 10, 40, 0.4);
  }

  &:active {
    transform: scale(0.9);
    background-color: #eee;
  }
`;

const citationsHeader = css`
  padding: 0 20px;
  margin: 0.75em 0;
  font-size: 2rem;
  font-weight: bold;
`;

const citationWrapper = css`
  padding: 0 20px;
  margin: 0.1em 0;
`;

export default function Citations({ open, onClose }: Props) {
  return (
    <div className={[dialog, open ? "open" : "closed"].join(" ")}>
      <button className={closeButton} onClick={onClose}>
        <CloseIcon />
      </button>
      <h2 className={citationsHeader}>Citations</h2>
      <div className={citationWrapper}>
        {ReferenceStore.all.map(({ full, id }) => (
          <p className={reference} key={id}>
            {full}
          </p>
        ))}
      </div>
    </div>
  );
}
