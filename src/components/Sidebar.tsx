import { css } from "@emotion/css";
import React, { useRef, useState } from "react";
import SpeciesStore from "../data/SpeciesStore";
import publish from "../pubsub/publish";
import useSubscription from "../pubsub/useSubscription";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import Taxonomy from "./Taxonomy";
import Legend from "./Legend";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import ReferenceStore from "../data/ReferenceStore";
import Citations from "./Citations";

const PADDING = 20;

const backdrop = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  padding: ${PADDING}px;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;

  &.closed {
    opacity: 0;
  }
`;

const dialog = css`
  position: absolute;
  outline: none;
  border: none;
  padding: 0;
  top: ${PADDING}px;
  right: ${PADDING}px;
  width: 560px;
  max-width: calc(100% - ${PADDING * 2}px);
  height: calc(100% - ${PADDING * 2}px);
  background-color: #fff;
  border-radius: 20px;
  pointer-events: auto;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 4px 40px rgba(10, 10, 20, 0.4);

  &.closed {
    transform: translateX(calc(100% + ${PADDING * 2}px));
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

const content = css`
  position: relative;
  width: 100%;
  padding: 20px;

  & > h2 {
    margin: 0;
    position: absolute;
    font-size: 1.5em;
    line-height: 0.9em;
    top: -2em;
    background-color: #fff;
    padding: 0.6em 0.8em;
    border-radius: 10px 10px 0 0;

    & .binomial {
      font-weight: 400;
      font-size: 0.6em;
      color: #444;
      font-style: italic;
    }
  }

  & p {
    font-size: 1rem;
    line-height: 1.5em;
  }
`;

const contextButton = (top: number) => css`
  position: absolute;
  top: ${top}px;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  color: black;
  font-size: 1.5em;
  border: 1px solid #888;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus,
  &:hover {
    border: 1px solid transparent;
    box-shadow: 0 0 6px rgba(10, 10, 40, 0.4);
    transform: scale(1.1);
  }

  &:active {
    border: 1px solid transparent;
    transform: scale(0.9);
    background-color: #eee;
  }
`;

const title = css`
  position: absolute;
  top: ${PADDING}px;
  left: ${PADDING}px;
  display: inline-block;
  padding: 1em 1.4em;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(10, 10, 20, 0.2);

  & > h1 {
    font-size: 1.8em;
    font-weight: 500;
    margin: 0;
  }

  & .attribution {
    font-weight: 400;
    font-size: 1em;
    color: #222;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const citationsButton = css`
  position: absolute;
  bottom: ${PADDING}px;
  right: ${PADDING}px;
  font-size: 1.5em;
  background-color: #fff;
  border-radius: 10px;
  padding: 0.6em 0.8em;
  border: 1px solid transparent;
  box-shadow: 0 2px 8px rgba(10, 10, 20, 0.2);
  pointer-events: auto;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.3em;
  font-weight: 500;
  letter-spacing: -0.02em;
  font-family: "DM Sans", sans-serif;
  transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background-color: #fafafa;
    box-shadow: 0 2px 10px rgba(10, 10, 20, 0.2);
    transform: translateY(-1px);
  }

  &:focus {
    border: 1px solid #888;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(10, 10, 20, 0.2);
    background-color: #fafafa;
  }
`;

export default function Sidebar() {
  const binomial = useSubscription<string>("show-details");
  const [citationsOpen, setCitationsOpen] = useState(false);

  const state = binomial !== null ? "open" : "closed";
  const prev = useRef(binomial);

  const species = SpeciesStore.get(binomial ?? prev.current ?? "Hylobates lar");

  if (species !== null) {
    prev.current = binomial;
  }

  return (
    <div>
      <div
        className={[
          backdrop,
          state === "open" || citationsOpen ? "open" : "closed",
        ].join(" ")}
      ></div>
      <div className={title}>
        <h1>Human Relatives</h1>
        <small className="attribution">By Daniel Noon</small>
      </div>
      <button
        className={citationsButton}
        onClick={() => setCitationsOpen(true)}
      >
        <AssignmentIcon />
        Citations
      </button>
      <Citations open={citationsOpen} onClose={() => setCitationsOpen(false)} />
      <Legend />
      <div className={[dialog, state].join(" ")}>
        <OverlayScrollbarsComponent
          style={{ height: "100%" }}
          options={{ scrollbars: { autoHide: "move" } }}
        >
          <button
            className={contextButton(10)}
            onClick={() => publish("show-details", null)}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
          {species && (
            <>
              <button
                className={contextButton(60)}
                onClick={() => window.open(species.image)}
                aria-label="View image source"
              >
                <ImageSearchIcon />
              </button>
              <img src={species.image} alt={species.name} width="100%" />
              <div className={content}>
                <h2>
                  {species.name} <br />
                  <small className="binomial">{species.binomial}</small>
                </h2>
                <Taxonomy names={species.taxonomy} status={species.status} />
                <h3>Description</h3>
                {species.description.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {species.youtube && (
                <>
                  <h3 style={{ paddingInline: 20, marginTop: 0 }}>Video</h3>
                  <iframe
                    width="100%"
                    height="300"
                    src={`https://www.youtube-nocookie.com/embed/${species.youtube}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </>
              )}
              <div className={content} style={{ paddingBottom: 40 }}>
                <h3>Attributions</h3>
                {species.wikipedia && (
                  <div>
                    <a
                      href={species.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Text adapted from Wikipedia.
                    </a>
                    {" ??? "}
                    <a href="https://creativecommons.org/licenses/by-sa/3.0/">
                      CC BY-SA 3.0
                    </a>
                  </div>
                )}

                {species.references && (
                  <>
                    <h4>References</h4>
                    <ul>
                      {species.references.map((ref, i) => (
                        <li key={ref}>{ReferenceStore.get(ref).short}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </>
          )}
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}
