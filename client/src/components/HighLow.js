import { useState, useEffect } from 'react';
import Modal from './Modal';

function HighLow({ onBack, id }) {
    const [deck, setDeck] = useState(null);
    const [dealerCard, setDealerCard] = useState(null);
    const [playerCard, setPlayerCard] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isWon, setIsWon] = useState(null);
    const [coin, setCoin] = useState(100);
    //balance - come up with a formula on how much coin is gained/lost based on the cards
    //when Modal buttons are clicked a patch request is also sent with the object: {game_type: 'highlow', isWon: isWon state, balance: Number (offset of coins)}
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
        setDealerCard(null);
        setPlayerCard(null);
        setPrediction(null);
        setIsWon(null);
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
                //set coin value based on cards
            } else if (dealerValue < playerValue && prediction === 'higher') {
                setIsWon(true);
                 //set coin value based on cards
            } else if (dealerValue === playerValue && prediction === 'same') {
                setIsWon(true);
                 //set coin value based on cards
            } else {
                setIsWon(false);
                 //set coin value based on cards
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
            <Modal onClose={handleBack} onPlayAgain={handlePlayAgain} isWon={isWon} balance={coin} name='highlow' playerId={id}/>
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