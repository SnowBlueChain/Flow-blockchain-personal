import Match from "./Match"

export default interface GroupedMatches {
    [gameId: string]: Match[];
}