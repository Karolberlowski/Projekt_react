import { initialMems } from './data';

export function getMem() {
  const memList = initialMems;
  return memList;
}

export function filterHotMem() {
  let filtredMem = getMem().filter((type) => type.upvote - type.downvote > 5);
  return filtredMem;
}
export function filterRegMem() {
  let filtredMem = getMem().filter((type) => type.upvote - type.downvote <= 5);
  return filtredMem;
}
