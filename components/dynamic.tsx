import { NextSFC } from "next";

const Dynamic: NextSFC<{ isServer?: boolean }> = ({ isServer }) => <div>{isServer ? "server" : "client"}</div>;

Dynamic.getInitialProps = () => {
    const isServer = typeof window === "undefined";
    return { isServer };
};

export default Dynamic;
