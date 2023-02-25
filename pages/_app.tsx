import React from "react"
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps as NextAppProps } from "next/app"
import { AuthProvider } from "../components/AuthProvider"
import { ComponentWithAuth } from "../components/ComponentWithAuth"
import { GraphQLClientProvider } from "../components/GraphQLClientProvider"
import { ReactQueryClientProvider } from "../components/ReactQueryClientProvider"
import { MetaMaskProvider } from "metamask-react"
import Head from "next/head"

type AppProps<P = {}> = NextAppProps<P> & {
  Component: ComponentWithAuth
}

const App = ({ Component, pageProps: { session, auth, ...pageProps } }: AppProps): JSX.Element => (
  <>
    <Head>
      <title>FlowMatch - #1 eSports Betting on the Flow Blockchain!</title>
      <meta name="description" content="Be part of the #1 eSports Betting Game on the Flow Blockchain!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    {/* Refetch session every hour since niftory tokens expire after 1 hour*/}
    <SessionProvider session={session} refetchInterval={60 * 60}>
      <AuthProvider requireAuth={Component.requireAuth}>
        <ReactQueryClientProvider>
          <GraphQLClientProvider>
            <ChakraProvider>
              {/* This is for Polygon/Eth blockchains only. This component is a no-op for the Flow blockchain */}
              <MetaMaskProvider>
                <Component {...pageProps} />
              </MetaMaskProvider>
            </ChakraProvider>
          </GraphQLClientProvider>
        </ReactQueryClientProvider>
      </AuthProvider>
    </SessionProvider>
  </>
)

export default App
