import { useEffect, useState } from "react";
import { sample } from "lodash";
import { buildDeck, TDeck } from "../utils/cards";

const CARD_BREAKPOINTS = {
    MAX_LEVEL_1_CARDS: 9,
    MAX_LEVEL_2_CARDS: 21,
    MAX_LEVEL_3_CARDS: 31,
};

const CardScreen = () => {
    const [cards, setCards] = useState<string[]>([]);
    const [deck, setDeck] = useState<TDeck>();
    const [currentCardIndex, setCurrentCardIndex] = useState(-1);

    const drawCard = () => {
        console.log({ deck });
        let card = "";
        if (currentCardIndex === 13) {
            card =
                "Quão emocionalmente disponível você se sente atualmente? Explique.";
        } else if (currentCardIndex === 11) {
            card =
                "Complete a frase: 'Eu sei que tou realmente gostando de alguém quando _____'";
        } else if (currentCardIndex >= CARD_BREAKPOINTS.MAX_LEVEL_3_CARDS) {
            card =
                "Tirem uma selfie. Depois, cada jogador escreve uma mensagem para o outro em papel. Dobre-as e as entregue um para o outro. Abram para ler apenas quando vocês se despedirem.";
        } else if (currentCardIndex > CARD_BREAKPOINTS.MAX_LEVEL_2_CARDS) {
            card = sample(deck?.level3Deck) || "";
            setDeck((deck) => {
                return {
                    ...deck,
                    level3Deck: deck?.level3Deck.filter((c) => c !== card),
                } as TDeck;
            });
        } else if (currentCardIndex > CARD_BREAKPOINTS.MAX_LEVEL_1_CARDS) {
            card = sample(deck?.level2Deck) || "";
            setDeck((deck) => {
                return {
                    ...deck,
                    level2Deck: deck?.level2Deck.filter((c) => c !== card),
                } as TDeck;
            });
        } else {
            card = sample(deck?.level1Deck) || "";
            setDeck((deck) => {
                return {
                    ...deck,
                    level1Deck: deck?.level1Deck.filter((c) => c !== card),
                } as TDeck;
            });
        }
        if (!card) {
            return;
        }
        setCards((oldCards) => [...oldCards, card]);
        setCurrentCardIndex((oldIndex) => oldIndex + 1);
    };

    const previousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex((oldIndex) => oldIndex - 1);
        }
    };

    const nextCard = () => {
        if (currentCardIndex >= cards.length - 1) {
            drawCard();
        } else {
            setCurrentCardIndex((oldIndex) => oldIndex + 1);
        }
    };

    useEffect(() => {
        const deckBuilt = buildDeck({ includeDating: true });
        setDeck(deckBuilt);
    }, []);

    useEffect(() => {
        if (currentCardIndex === -1) {
            drawCard();
        }
    }, [deck]);

    const getLevelTitle = () => {
        if (currentCardIndex > CARD_BREAKPOINTS.MAX_LEVEL_3_CARDS) {
            return "Carta Final";
        } else if (currentCardIndex > CARD_BREAKPOINTS.MAX_LEVEL_2_CARDS) {
            return "Nível 3: Reflexão";
        } else if (currentCardIndex > CARD_BREAKPOINTS.MAX_LEVEL_1_CARDS) {
            return "Nível 2: Conexão";
        } else {
            return "Nível 1: Percepção";
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-full px-4">
            <div className="text-red-500 text-4xl mb-8 font-semibold">
                {getLevelTitle()}
            </div>
            <div className="text-red-500 text-xl mb-8 font-semibold">
                Carta {currentCardIndex + 1} de {cards.length}
            </div>
            <div className="bg-red-500 text-white w-full px-4 py-2 rounded-md text-2xl flex justify-center items-center flex-col text-center h-64">
                <span>
                    {cards.length
                        ? cards[currentCardIndex]
                        : "No card available"}
                </span>
                <br />
                {currentCardIndex <= CARD_BREAKPOINTS.MAX_LEVEL_3_CARDS && (
                    <span className="mt-8 text-base italic">
                        {getLevelTitle()}
                    </span>
                )}
            </div>
            <div className="mt-16">
                {currentCardIndex > 0 && (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                        onClick={() => {
                            previousCard();
                        }}
                    >
                        &#60; Anterior
                    </button>
                )}
                <span className="px-8"></span>
                {currentCardIndex <= CARD_BREAKPOINTS.MAX_LEVEL_3_CARDS && (
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                        onClick={() => {
                            nextCard();
                        }}
                    >
                        Próxima &#62;
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardScreen;
