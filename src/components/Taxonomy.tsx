import React from "react";
import { izip } from "itertools";
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
  const sortedLevels = [...izip(levels, names)].filter(
    ([, name]) => name.length > 0
  );

  return (
    <ul>
      {sortedLevels.map(([level, name]) => (
        <li className={levelItem(level)} key={level}>
          {name}
        </li>
      ))}
    </ul>
  );
}
