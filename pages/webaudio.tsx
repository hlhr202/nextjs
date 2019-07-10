import Link from "next/link";
import Header from "../components/header";
import dynamic from "next/dynamic";
import { NextSFC } from "next";

const DynamicWebAudio = dynamic(import("../components/webaudio-dynamic"), { ssr: false });

const AboutPage: NextSFC = () => {
    return (
        <main>
            <Header />
            <section>
                <Link href="/">
                    <a>Go to Home</a>
                </Link>
                <DynamicWebAudio />
            </section>
        </main>
    );
};

export default AboutPage;
