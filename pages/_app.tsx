import type { AppProps } from "next/app";
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { Polygon } from '@thirdweb-dev/chains'

// This is the chain your dApp will work on.
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
    activeChain={Polygon}
    supportedChains={[Polygon]}
    autoConnect
    clientId={clientId}
    supportedWallets={[metamaskWallet()]}
    authConfig={{
      domain:
          process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN ||
          'http://localhost:3000',
      authUrl: '/api/auth',
    }}
      >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
