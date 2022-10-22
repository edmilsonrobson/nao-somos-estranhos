import { useState } from "react";
import CardScreen from "./CardScreen";
import TitleScreen from "./TitleScreen";

const MainGame = () => {
    const [isTitle, setIsTitle] = useState(true);

    if (isTitle) {
        return (
            <TitleScreen
                onStartClick={(withDatingExpansion) => {
                    setIsTitle(false);
                }}
            />
        );
    }

    return <CardScreen />;
};

export default MainGame;
