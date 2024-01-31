import { useState, useEffect } from 'react';
import Modal from './Modal';

function HighLow({ onBack, id }) {
    const [deck, setDeck] = useState(null);
    const [dealerCard, setDealerCard] = useState(null);
    const [playerCard, setPlayerCard] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isWon, setIsWon] = useState(null);
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchDeck = async () => {
            const response = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            const deckData = await response.json();
            setDeck(deckData['deck_id']);
        }

        if (deck === null) {
            fetchDeck();
        }

        return () => { abortController.abort() }
    }, [deck]);


    useEffect(() => {
        const abortController = new AbortController();

        if (deck) {
            fetchCard(true);
        }

        return () => { abortController.abort() }
    }, [deck]);

    const handleBack = () => {
        onBack();
    }

    const handlePlayAgain = () => {
        setDeck(null);
        setDealerCard(null);
        setPlayerCard(null);
        setPrediction(null);
        setIsWon(null);
        setCoin(null);
    };

    const fetchCard = async (dealt) => {
        const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
        const data = await response.json();
        if (dealt) {
            setDealerCard(data.cards[0]);
        } else {
            setPlayerCard(data.cards[0]);
            setOutcome();
        }
    }

    const convertValue = (card) => {
        let value;
        if (isNaN(Number(card.value))) {
            value = 10;
        } else {
            value = Number(card.value);
        }
        return value;
    }

    const calculateOdds = () => {
        const dealerValue = convertValue(dealerCard);
        const playerValue = convertValue(playerCard);
        const totalPossibleOutcomes = 2 * (10 - dealerValue);

        let favorableOutcomes = 0;

        if (prediction === 'higher') {
            for (let i = dealerValue + 1; i <= 10; i++) {
                if (i > playerValue) {
                    favorableOutcomes++;
                }
            }
        } else if (prediction === 'lower') {
            for (let i = 2; i < dealerValue; i++) {
                if (i < playerValue) {
                    favorableOutcomes++;
                }
            }
        } else if (prediction === 'same') {
            for (let i = 2; i <= 10; i++) {
                if (i === dealerValue && i === playerValue) {
                    favorableOutcomes++;
                }
            }

            const odds = favorableOutcomes / totalPossibleOutcomes;
            return odds;
        }
    }

    const calculateBet = () => {
        const base = 100;
        const odds = calculateOdds();

        const bet = Math.round(base * odds);
        console.log(base + bet + odds);
        return bet;
    }

    const setOutcome = () => {
        if (dealerCard && playerCard) {
            const dealerValue = convertValue(dealerCard);
            const playerValue = convertValue(playerCard);
            if (dealerValue > playerValue && prediction === 'lower') {
                setIsWon(true);
                setCoin(calculateBet());
            } else if (dealerValue < playerValue && prediction === 'higher') {
                setIsWon(true);
                setCoin(calculateBet());
            } else if (dealerValue === playerValue && prediction === 'same') {
                setIsWon(true);
                setCoin(calculateBet());
            } else {
                setIsWon(false);
                setCoin(calculateBet());
            }
        }
    }

    useEffect(() => {
        if (playerCard !== null) {
            setOutcome();
        }
    }, [playerCard]);

    return (
        <div className='highlow'>
            <button onClick={handleBack}>Back</button>
            <Modal onClose={handleBack} onPlayAgain={handlePlayAgain} isWon={isWon} balance={coin} name='highlow' playerId={id} />
            <div className='dealer'>
                {prediction && <h1>Your prediction: {prediction}</h1>}
                {dealerCard && <img src={dealerCard.image} alt={dealerCard.value + dealerCard.suit} />}
            </div>
            {(prediction && !playerCard) && <button onClick={() => fetchCard(false)}>Draw</button>}
            <div className='player'>
                {playerCard && <img src={playerCard.image} alt={playerCard.value + playerCard.suit} />}
                <button onClick={() => setPrediction('lower')}>Lower</button>
                <button onClick={() => setPrediction('same')}>Same</button>
                <button onClick={() => setPrediction('higher')}>Higher</button>
            </div>
        </div>
    )
}

export default HighLow;