import React from "react";
import { zip } from "itertools";
import { css } from "@emotion/css";
import COLORS from "../colors";

const levels = [
  "Suborder",
  "Infraorder",
  "Parvorder",
  "Superfamily",
  "Family",
  "Subfamily",
  "Tribe",
  "Genus",
  "Species",
];

interface Props {
  names: string[];
  status: string;
}

const wrapper = css`
  display: flex;
  flex-direction: row;

  & > div {
    flex: 1 1 auto;
  }

  & .taxonomy > h3 {
    padding-left: 10px;
  }

  & .levels {
    padding: 10px;
    margin: 0;
  }

  & .status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    & .status-wrapper {
      flex: 1;
      display: grid;
      place-items: center;
      max-height: 10em;
    }
  }
`;

const statusText = (status: string) => css`
  font-size: 1.4em;
  padding: 0.5em 0.8em;
  border-radius: 0.5em;
  color: ${COLORS[`${status}:text`]};
  background-color: ${COLORS[`${status}:bg`]};
`;

const levelItem = (level: string) => css`
  color: ${COLORS[level.toLowerCase()]};
  margin-top: 1em;
  list-style: none;

  &::before {
    content: attr(data-level);
    position: absolute;
    margin-top: -0.8em;
    font-size: 0.7em;
    text-transform: uppercase;
    font-weight: bold;
    display: block;
  }

  &::marker {
    content: "";
  }
`;

export default function Taxonomy({ names, status }: Props) {
  const sortedLevels = zip(levels, names).filter(([, name]) => name);

  return (
    <div className={wrapper}>
      <div className="taxonomy">
        <h3>Taxonomy</h3>
        <ol className="levels">
          {sortedLevels.map(([level, name]) => (
            <li data-level={level} className={levelItem(level)} key={level}>
              {name}
            </li>
          ))}
        </ol>
      </div>
      <div className="status">
        <h3>Conservation Status</h3>
        <div className="status-wrapper">
          <span className={statusText(status)}>{status}</span>
        </div>
      </div>
    </div>
  );
}
