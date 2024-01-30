import { useState, useEffect } from 'react';
import Modal from './Modal';

function HighLow({ onBack }) {
    const [deck, setDeck] = useState(null);
    const [dealtCard, setDealtCard] = useState(null);
    const [drawnCard, setDrawnCard] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isWon, setIsWon] = useState(null);
    //balance - come up with a formula on how much coin is gained/lost based on the cards
    //when Modal buttons are clicked a post request is also sent with the object: {game_type: 'highlow', isWon: isWon state, balance: Number (offset of coins)}
    //the players coin_balance is updated with the number based on the isWon key and the game object is pushed into the game_history key


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
        setDealtCard(null);
        setDrawnCard(null);
        setPrediction(null);
        setIsWon(null);
    };

    const fetchCard = async (dealt) => {
        const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
        const data = await response.json();
        if (dealt) {
            setDealtCard(data.cards[0]);
        } else {
            setDrawnCard(data.cards[0]);
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

    const setOutcome = () => {
        if (dealtCard && drawnCard) {
            const dealerValue = convertValue(dealtCard);
            const playerValue = convertValue(drawnCard);
            if (dealerValue > playerValue && prediction === 'lower') {
                setIsWon(true);
            } else if (dealerValue < playerValue && prediction === 'higher') {
                setIsWon(true);
            } else if (dealerValue === playerValue && prediction === 'same') {
                setIsWon(true);
            } else {
                setIsWon(false);
            }
        }
    }

    useEffect(() => {
        if (drawnCard !== null) {
            setOutcome();
        }
    }, [drawnCard]);

    return (
        <div className='highlow'>
            <button onClick={handleBack}>Back</button>
            <Modal onClose={handleBack} onPlayAgain={handlePlayAgain} isWon={isWon}/>
            <div className='dealer'>
                {prediction && <h1>Your prediction: {prediction}</h1>}
                {dealtCard && <img src={dealtCard.image} alt={dealtCard.value + dealtCard.suit} />}
            </div>
            {(prediction && !drawnCard) && <button onClick={() => fetchCard(false)}>Draw</button>}
            <div className='player'>
                {drawnCard && <img src={drawnCard.image} alt={drawnCard.value + drawnCard.suit} />}
                <button onClick={() => setPrediction('lower')}>Lower</button>
                <button onClick={() => setPrediction('same')}>Same</button>
                <button onClick={() => setPrediction('higher')}>Higher</button>
            </div>
        </div>
    )
}

export default HighLow;