import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React, { useEffect, useRef } from "react";
import ReferenceStore from "../data/ReferenceStore";
import SpeciesStore from "../data/SpeciesStore";
import licenses from "../data/licenses.json";

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
  display: flex;
  flex-direction: column;

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
  padding-left: 1em;
  text-indent: -1em;
`;

const closeButton = css`
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #aaa;
  z-index: 100;

  &:hover,
  &:focus {
    box-shadow: 0 0 6px rgba(10, 10, 40, 0.4);
    transform: scale(1.1);
    border: 1px solid transparent;
  }

  &:active {
    border: 1px solid transparent;
    transform: scale(0.9);
    background-color: #eee;
    box-shadow: 0 0 6px rgba(10, 10, 40, 0.4);
  }
`;

const citationsHeader = css`
  font-size: 2rem;
  font-weight: bold;
`;

const wrapper = css`
  padding: 0 20px;
  margin: 0.1em 0;
`;

const subheader = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1em 0;
  padding: 0 20px;
`;

const toolbar = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  height: 5em;
`;

const githubButton = css`
  font-size: 1.5rem;
  padding: 0.5em;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(10, 10, 40, 0.2);
  column-gap: 0.5em;
  text-decoration: none;
  color: #000;

  &:hover,
  &:focus {
    box-shadow: 0 2px 12px rgba(10, 10, 40, 0.2);
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.98);
    background-color: #eee;
    box-shadow: 0 0 6px rgba(10, 10, 40, 0.2);
  }
`;

const licenseTable = css`
  border-collapse: collapse;
  margin: 25px auto;
  font-size: 0.9em;
  font-family: sans-serif;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 100%;
  max-width: 40em;
  overflow: hidden;

  & thead tr {
    background-color: black;
    color: white;
    text-align: left;
  }

  & th,
  & td {
    padding: 12px 15px;
  }

  & tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  & tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  & tbody tr:last-of-type {
    border-bottom: 2px solid black;
  }
`;

export default function Citations({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  return (
    <div className={[dialog, open ? "open" : "closed"].join(" ")}>
      <div className={toolbar}>
        <h2 className={citationsHeader}>Citations</h2>
        <button
          ref={closeRef}
          className={closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>
      <OverlayScrollbarsComponent
        style={{ flex: 1 }}
        options={{ scrollbars: { autoHide: "move" } }}
      >
        <h3 className={subheader}>Source Code</h3>
        <div className={wrapper} style={{ padding: "0 40px" }}>
          <a
            className={githubButton}
            href="https://github.com/danielnoon/anthro-evolution"
          >
            <GitHubIcon style={{ height: "1.5em" }} />
            <span>danielnoon/anthro-evolution</span>
          </a>
        </div>
        <h3 className={subheader}>References</h3>
        <div className={wrapper}>
          {ReferenceStore.all
            .sort((a, b) => (a.full > b.full ? 1 : -1))
            .map(({ full, id }) => (
              <p className={reference} key={id}>
                {full}
              </p>
            ))}
        </div>
        <h3 className={subheader}>Image Sources</h3>
        <div className={wrapper}>
          <ul>
            {SpeciesStore.all.map(({ image, binomial }) => (
              <li key={binomial}>
                <a href={image} target="_blank" rel="noopener noreferrer">
                  {binomial}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <h3 className={subheader}>OSS Licensing</h3>
        <div className={wrapper} style={{ paddingBottom: "4em" }}>
          <table className={licenseTable}>
            <thead>
              <tr>
                <th>Package</th>
                <th>License</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((license) => (
                <tr key={license.name}>
                  <td>
                    <a href={license.link} rel="noopener noreferrer">
                      {license.name}
                    </a>
                  </td>
                  <td>{license.licenseType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
}
