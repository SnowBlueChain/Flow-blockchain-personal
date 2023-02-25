//import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { NextApiHandler } from "next"
import Match from '../../interfaces/Match';
import GroupedMatches from '../../interfaces/GroupedMatches';

const handler: NextApiHandler = async (req, res) => {
  try {
    // Retrieve the match data (from fs now, should be replaced by an API in the future)
    //const data: Match[] = JSON.parse(await fs.readFile(./public/2023_LoL_esports_match_data.json, 'utf-8'));
    const response: Response = await fetch(process.env.NEXT_PUBLIC_MATCH_DATA_PATH)
    const data: Match[] = await response.json();
    //const data: Match[] = JSON.parse(await fs.readFile(process.env.MATCH_DATA_PATH, "utf-8"));
    
    console.log(process.env.NEXT_PUBLIC_MATCH_DATA_PATH)
    console.log("response", response)

    //const today = new Date().toISOString().substring(0,10)
    //yesterday.setDate(today.getDate() - 1)
    //const formattedDate = yesterday.toISOString().substring(0, 10)

    // only data from yesterday (as it is complete)
    let filteredData: Match[] = data.filter(item => item.date.substring(0, 10) == "2023-02-20")
    // only complete tournament data
    filteredData = filteredData.filter(item => item.datacompleteness == "complete")
    // only NACL league until now
    filteredData = filteredData.filter(item => item.league == "NACL")
    // only team position, so just 2 entries (red/blue) per GameId
    filteredData = filteredData.filter(item => item.position == "team")
    // filter by a specific GameId
    //filteredData = filteredData.filter(item => item.gameid == "ESPORTSTMNT02_3154434")

    console.log("filteredData", filteredData)

    // group entries by unique game id
    const groupedGames: GroupedMatches = filteredData.reduce((games, currentItem) => {
        const { gameid } = currentItem
        games[gameid] = games[gameid] || []
        games[gameid].push(currentItem)
        return games
    }, {} as GroupedMatches)
    res.status(200).json(groupedGames);
  } catch (err) {
    console.log(process.env.NEXT_PUBLIC_MATCH_DATA_PATH)
    console.log(err)
    res.status(500).json({ message: 'Error reading data file.' });
  }
}

export default handler;