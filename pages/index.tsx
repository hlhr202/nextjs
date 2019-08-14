import Link from "next/link";
import Header from "../components/header";

function Index() {
    return (
        <main>
            <Header />
            <section>
                <Link href="/webcg">
                    <a>CG show case</a>
                </Link>
                <br />
                <Link href="/webaudio">
                    <a>Audio show case</a>
                </Link>
                <br />
                <Link href="/webaudio2">
                    <a>Audio Test 2</a>
                </Link>
            </section>
        </main>
    );
}

export default Index;
