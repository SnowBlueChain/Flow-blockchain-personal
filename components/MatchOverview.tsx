import { Box, Button, Divider, Heading, Text, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react"
import GroupedMatches from "../interfaces/GroupedMatches"
import getInitials from "../helpers/getInitials"

export default function MatchOverview() {
    const [matches, setMatches] = useState<GroupedMatches>({})

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('/api/matches')
                const data: GroupedMatches = await response.json()
                console.log(process.env.MATCH_DATA_PATH)
                console.log(data)
                setMatches(data)
            } catch (error) {
                console.log(process.env.MATCH_DATA_PATH)
                console.log(error)
                console.error(error)
            }
        }

        fetchMatches()

        const intervalId = setInterval(fetchMatches, 10000)

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId)
    }, [])

    // TODO: implement button logic, so the new bet is stored in their account storage

    return (
        <div>
            <Box flexDir="column" mt={2}>
                <Heading as="h2" size="lg" fontWeight="bold" mb={2}>
                    League of Legends / NACL League Tournament Matches
                </Heading>
                <Divider />
                <br />
                {matches
                    ? Object.entries(matches).map(([gameid, gameData]) => (
                        <Box key={gameid} rounded="lg" shadow="md" p={3} mb={5} bg="gray.500">
                            <Text fontWeight="bold" mb={2}>
                                {gameData[0].date.split(" ")[0]} | {gameData[0].date.split(" ")[1]}
                            </Text>                            
                            <HStack spacing={2}>
                                <Text fontWeight="bold"
                                    p={2}
                                    flex={4}
                                    fontSize="md"
                                    style={{ textAlign: "left" }}>
                                    {gameData.find(({ side }) => side === "Blue").teamname}
                                    {" "}VS{" "}
                                    {gameData.find(({ side }) => side === "Red").teamname}
                                </Text>
                                <Button
                                    colorScheme="blue"
                                    fontWeight="bold"
                                    py={6}
                                    px={4}
                                    mr={2}
                                    rounded="md"
                                    flex={1}
                                >
                                    BET for {getInitials(gameData.find(({ side }) => side === "Blue").teamname)}
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    fontWeight="bold"
                                    py={6}
                                    px={4}
                                    rounded="md"
                                    flex={1}
                                >
                                    BET for {getInitials(gameData.find(({ side }) => side === "Red").teamname)}
                                </Button>
                            </HStack>
                        </Box>
                    ))
                    : "Loading..."}
            </Box>
        </div>
    )
}