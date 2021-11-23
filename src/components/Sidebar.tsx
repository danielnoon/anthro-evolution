import { css } from "@emotion/css";
import React from "react";
import SpeciesStore from "../data/SpeciesStore";
import publish from "../pubsub/publish";
import useSubscription from "../pubsub/useSubscription";

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
  top: ${PADDING}px;
  right: ${PADDING}px;
  width: 500px;
  height: calc(100% - ${PADDING * 2}px);
  background-color: #fff;
  border-radius: 20px;
  pointer-events: auto;
  transition: transform 0.2s ease-in-out;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 4px 40px rgba(10, 10, 20, 0.4);

  &.closed {
    transform: translateX(100%);
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
`;

const closeButton = css`
  position: absolute;
  top: 10px;
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
`;

export default function Sidebar() {
  const binomial = useSubscription<string>("show-details");
  const state = binomial !== null ? "open" : "closed";

  const species = SpeciesStore.get(binomial ?? "");

  return (
    <div>
      <div className={[backdrop, state].join(" ")}></div>
      <div className={[dialog, state].join(" ")}>
        <button
          className={closeButton}
          onClick={() => publish("show-details", null)}
        >
          &times;
        </button>
        {species && (
          <>
            <img src={species.image} alt={species.name} width="100%" />
            <div className={content}>
              <h2>
                {species.name} <br />
                <small className="binomial">{species.binomial}</small>
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                iste nobis sapiente impedit dignissimos nostrum fuga quam, vero
                inventore veniam error illum enim totam deleniti, necessitatibus
                velit dolores fugit! Iusto?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, ex. Explicabo veniam debitis odit, numquam voluptatem
                nesciunt enim voluptatum molestias! Iste repudiandae rem illo
                aliquid explicabo at labore maiores quibusdam!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
