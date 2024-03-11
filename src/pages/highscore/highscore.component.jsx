import { useEffect } from "react";

/*Components*/
import Header from "../../components/header/header.component";
import HighscoreData from "../../components/Highscore/highscore.component";

export function Highscore() {
    useEffect(() => {
        document.body.style.background = "#fafafa";
    }, []);
    return (
        <>
            <Header />
            <HighscoreData />
        </>
    );
}
