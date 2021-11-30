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
    text-align: center;
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
`;

export default function Taxonomy({ names, status }: Props) {
  const sortedLevels = zip(levels, names).filter(([, name]) => name);

  return (
    <div className={wrapper}>
      <div className="taxonomy">
        <h3>Taxonomy</h3>
        <ul>
          {sortedLevels.map(([level, name]) => (
            <li className={levelItem(level)} key={level}>
              {name}
            </li>
          ))}
        </ul>
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
