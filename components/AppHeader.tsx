import { VStack, Heading, Button, Text, HStack, useClipboard } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Image from "next/image"

import { useAuthContext } from "../hooks/useAuthContext"

export function AppHeader() {
  const { session, signOut, signIn } = useAuthContext()
  const onCopy  = null //useClipboard(session?.authToken as string)
  const router = useRouter()

  return (
    <VStack textColor="white" mb="3vh">
      {!session && (
        <Image src="/FlowMatch.png" alt="FlowMatch Logo" width={500} height={500} />
      )}
      <Heading>Flow Match</Heading>
      <Text fontSize="xl" fontWeight="semibold">Be part of the #1 eSports Betting Game on the Flow Blockchain!</Text>
      {session && (
        <>
          <Text>
            <>
              User: {session?.user?.email} (ID: {session?.userId})
            </>
          </Text>
        </>
      )}
      {/*<Text> App ID: {process.env.NEXT_PUBLIC_CLIENT_ID}</Text>
      <Text> X-Niftory-API-Key: </Text>
      <Text noOfLines={3} maxW="lg">
        {process.env.NEXT_PUBLIC_API_KEY}
      </Text>*/}
      {session && (
        <HStack>
          <Text>Authorization</Text>
          <Button colorScheme="gray" color="black" onClick={onCopy} size="sm">
            Copy Value
          </Button>
        </HStack>
      )}

      <HStack>
      {session && (
        <Button colorScheme="blue" onClick={() => router.push("/app/matches")}>
          Matches
        </Button>
        )}
        {session && (
          <Button colorScheme="blue" onClick={() => router.push("/app/collection")}>
          Collection
          </Button>
        )}
        <Button colorScheme="blue" onClick={() => router.push("/app/drops")}>
          Drops
        </Button>
        {session && (
          <Button colorScheme="blue" onClick={() => router.push("/app/wallet")}>
            Wallet
          </Button>
        )}
        {session ? (
          <Button colorScheme="blue" onClick={signOut}>
            Sign Out
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={signIn}>
            Sign In
          </Button>
        )}
      </HStack>
    </VStack>
  )
}
