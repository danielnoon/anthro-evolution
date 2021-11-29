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
}

const levelItem = (level: string) => css`
  color: ${COLORS[level.toLowerCase()]};
`;

export default function Taxonomy({ names }: Props) {
  const sortedLevels = zip(levels, names).filter(([, name]) => name);

  return (
    <div>
      <h3>Taxonomy</h3>
      <ul>
        {sortedLevels.map(([level, name]) => (
          <li className={levelItem(level)} key={level}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
