import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './HighLow.css';

function HighLow({ onBack, id, balance, updateBalance }) {
    const [deck, setDeck] = useState(null);
    const [dealerCard, setDealerCard] = useState(null);
    const [playerCard, setPlayerCard] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isWon, setIsWon] = useState(null);
    const [coin, setCoin] = useState(100);

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
        setCoin(100);
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


    const setOutcome = () => {
        if (dealerCard && playerCard) {
            const dealerValue = convertValue(dealerCard);
            const playerValue = convertValue(playerCard);
            if (dealerValue > playerValue && prediction === 'lower') {
                setIsWon(true);
                //console.log(coin);
                updateBalance(balance + coin);
            } else if (dealerValue < playerValue && prediction === 'higher') {
                setIsWon(true);
                //console.log(coin);
                updateBalance(balance + coin);
            } else if (dealerValue === playerValue && prediction === 'same') {
                setIsWon(true);
                //console.log(coin);
                updateBalance(balance + coin);
            } else {
                setIsWon(false);
                //console.log(coin);
                updateBalance(balance - coin);
            }
        }
    }

    useEffect(() => {
        if (playerCard !== null && dealerCard !== null && prediction !== null) {
            setOutcome();
        }
    }, [playerCard, dealerCard, prediction]);

    return (
        <div className='highlow'>
            <button onClick={handleBack}>Back</button>
            <Modal onClose={handleBack} onPlayAgain={handlePlayAgain} isWon={isWon} balance={coin} name='highlow' playerId={id} />
            {prediction && <h1>Your prediction: {prediction}</h1>}
            {(prediction && !playerCard) && <button onClick={() => fetchCard(false)}>Draw</button>}
            <div className='table'>
                <div className='dealer'>
                    {dealerCard && <img src={dealerCard.image} alt={dealerCard.value + dealerCard.suit} />}
                </div>
                <div className='player'>
                    {playerCard ? 
                    (
                        <img src={playerCard.image} alt={playerCard.value + playerCard.suit} />
                    ) : (
                    <div className='button-container'>
                        <button onClick={() => setPrediction('higher')}>Higher</button>
                        <button onClick={() => setPrediction('same')}>Same</button>
                        <button onClick={() => setPrediction('lower')}>Lower</button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HighLow;
