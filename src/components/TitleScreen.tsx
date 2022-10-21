import { useState } from "react";

interface IProps {
    onStartClick: (withDatingExpansion: boolean) => void;
}

const TitleScreen = ({ onStartClick }: IProps) => {
    const [withDatingExpansion, setWithDatingExpansion] = useState(true);

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <button
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => onStartClick(withDatingExpansion)}
            >
                Começar Jogo
            </button>

            <div className="flex items-center gap-2 mt-4">
                <input
                    type="checkbox"
                    name="datingExpansion"
                    id="datingExpansion"
                    checked={withDatingExpansion}
                    onChange={(e) => setWithDatingExpansion(e.target.checked)}
                />
                <label htmlFor="datingExpansion">
                    Incluir expansão de Dating?
                </label>
            </div>
        </div>
    );
};

export default TitleScreen;
