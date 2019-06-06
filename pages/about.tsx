import Link from "next/link";
import Header from "../components/header";
import { NextSFC } from "next";
import dynamic from "next/dynamic";

const DynamicImport = dynamic(import("../components/dynamic"));

const AboutPage: NextSFC<{ isServer: boolean }> = props => {
    return (
        <main>
            <Header />
            <section>
                <p>
                    This is another page of the SSR example, you accessed it{" "}
                    <strong>{props.isServer ? "server" : "client"} side</strong>.
                </p>
                <p>You can reload to see how the page change.</p>
                <Link href="/">
                    <a>Go to Home</a>
                </Link>
                <DynamicImport />
            </section>
        </main>
    );
};

AboutPage.getInitialProps = () => {
    const isServer = typeof window === "undefined";
    return { isServer };
};

export default AboutPage;
