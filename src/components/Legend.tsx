import { css } from "@emotion/css";
import React from "react";
import COLORS from "../colors";

const PADDING = 20;

const legend = css`
  position: absolute;
  bottom: ${PADDING}px;
  left: ${PADDING}px;
  width: min-content;
  height: min-content;
  background-color: #fff;
  padding: 20px 26px;
  box-shadow: 0 2px 8px rgba(10, 10, 20, 0.2);
  border-radius: 20px;

  & .box {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 0.6em;
    border-radius: 2px;
  }

  & h3 {
    margin: 0 0 14px 0;
  }

  & ul {
    margin: 0;
    padding: 0;

    & > li {
      list-style: none;
      margin: 6px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
`;

export default function Legend() {
  return (
    <div className={legend}>
      <h3>Color&nbsp;Legend</h3>
      <ul>
        {Object.entries(COLORS).map(([level, color]) => (
          <li className="level" style={{ color }} key={level}>
            <div className="box" style={{ backgroundColor: color }}></div>
            {level}
          </li>
        ))}
      </ul>
    </div>
  );
}
