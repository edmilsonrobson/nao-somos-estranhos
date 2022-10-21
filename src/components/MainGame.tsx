import { useState } from "react";
import CardScreen from "./CardScreen";
import TitleScreen from "./TitleScreen";

const MainGame = () => {
    const [isTitle, setIsTitle] = useState(true);
    const [datingExpansionEnabled, setDatingExpansionEnabled] = useState(false);

    if (isTitle) {
        return (
            <TitleScreen
                onStartClick={(withDatingExpansion) => {
                    setIsTitle(false);
                    setDatingExpansionEnabled(withDatingExpansion);
                }}
            />
        );
    }

    return <CardScreen />;
};

export default MainGame;
