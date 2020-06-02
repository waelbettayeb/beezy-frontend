import Head from "next/head";
import { StatefulInput } from "baseui/input";

export default function Home(): React.FC {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StatefulInput />
    </div>
  );
}
