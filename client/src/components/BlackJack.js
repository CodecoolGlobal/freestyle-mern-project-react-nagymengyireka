import { useEffect, useState } from "react";

function BlackJack() {
  const [startGame, setStartGame] = useState(false);
  const [deckID, setDeckID] = useState(null);
  const [dealerCardImage, setDealerCardImage] = useState("");
  const [userCardImage, setUserCardImage] = useState("");
  const [cardFetched, setCardFetched] = useState(false);
  let [userCardValue, setUserCardValue] = useState("");
  let [dealerCardValue, setDealerCardValue] = useState("");
  let [dealerSecondCardValue, setDealerSecondCardValue] = useState("");
  const [dealerSecondCardImage, setDealerSecondCardImage] = useState("");
  let [userSecondCardValue, setUserSecondCardValue] = useState("");
  const [userSecondCardImage, setUserSecondCardImage] = useState("");
  const [userThirdCardValue, setUserThirdCardValue] = useState("");
  const [userThirdCardImage, setUserThirdCardImage] = useState("");
  const [isExtraCard, setIsExtraCard] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [isDraw, setIsDraw] = useState(false)
  const [userScore, setUserScore] = useState(0);

  const blankCardImage = "https://i.ibb.co/G9TrwDL/singlecard.png";

  function start() {
    setStartGame(true);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const fetchDeck = async () => {
      const response = await fetch(
        "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
      );
      const deckData = await response.json();
      setDeckID(deckData["deck_id"]);
    };

    if (deckID === null) {
      fetchDeck();
    }

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (deckID && !cardFetched) {
      const fetchCards = async () => {
        const response = await fetch(
          `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=6`
        );
        const data = await response.json();
        console.log("CARD", data);
        setDealerCardImage(data.cards?.[0]?.image);
        setDealerSecondCardImage(data.cards?.[2]?.image);
        setDealerCardValue(data.cards?.[0].code.charAt(0));
        setDealerSecondCardValue(data.cards?.[2].code.charAt(0));
        setUserCardImage(data.cards?.[1]?.image);
        setUserCardValue(data.cards?.[1].code.charAt(0));
        setUserSecondCardImage(data.cards?.[3]?.image);
        setUserSecondCardValue(data.cards?.[3].code.charAt(0));
        setUserThirdCardValue(data.cards?.[5].code.charAt(0));
        setUserThirdCardImage(data.cards?.[5]?.image);
      };
      fetchCards();
      setCardFetched(true);
    }
  }, [deckID, cardFetched]);

  function convertCardsToValue(card) {
    const numberTest = /^[1-9]+$/;
    return numberTest.test(card)
      ? parseInt(card)
      : card === "A"
      ? 11
      : card === "0" || "J" || "Q" || "K"
      ? 10
      : "";
  }

  const dealerValue =
    isExtraCard || endGame
      ? convertCardsToValue(dealerCardValue) +
        convertCardsToValue(dealerSecondCardValue)
      : convertCardsToValue(dealerCardValue);

  const userValue = isExtraCard
    ? convertCardsToValue(userCardValue) +
      convertCardsToValue(userSecondCardValue) +
      convertCardsToValue(userThirdCardValue)
    : convertCardsToValue(userCardValue) +
      convertCardsToValue(userSecondCardValue);

  function addCard() {
    setIsExtraCard(true);
  }
  function end() {
    setEndGame(true);
  }

  useEffect(() => {
    if (endGame) {
      if (userValue > dealerValue && userValue <= 21) {
        setIsWon(true);
      } else if (userValue === dealerValue) {
        setIsDraw(true)
      } else {
        setIsLost(true);
      }
    }
  }, [endGame, userValue, dealerValue]);

  return (
    <>
      {isWon ? (
        <>
        <div id="won">You won 100🪙</div>
        <button onClick={end}>Play again</button>
        </>
      ) : isLost ? (
        <>
        <div id="lost">You lost 100🪙</div>
        <button onClick={end}>Play again</button>
        </>
      ) : isDraw ? (
        <>
        <div id="draw">Its a push, coins returned!🪙</div>
        <button onClick={end}>Play again</button>
        </>
      ) : startGame ? (
        <div>
          <div id="deck-box">
            <div id="deck-box-place">
              <img
                src="https://i.ibb.co/xLHhP82/packofcards.png"
                alt="deck"
                id="deck"
                width="120"
              ></img>
            </div>
          </div>

          <div id="dealer-seat">
            {dealerCardImage && (
              <>
                <img
                  src={dealerCardImage}
                  alt="dealer-card"
                  id="dc"
                  width="70"
                />
                <img
                  src={blankCardImage}
                  alt="blank-card"
                  id="bc"
                  width="218"
                />
              </>
            )}
            {(isExtraCard || endGame) && (
              <img
                src={dealerSecondCardImage}
                alt="dealer-card2"
                id="dc2"
                width="70"
              />
            )}
            <div id="dealer-count">{dealerValue}</div>
          </div>

          <div id="user-seat">
            {userCardImage && (
              <img src={userCardImage} alt="user-card" id="uc" width="70" />
            )}
            {userSecondCardImage && (
              <img
                src={userSecondCardImage}
                alt="user-card2"
                id="uc2"
                width="70"
              ></img>
            )}
            {isExtraCard && (
              <img
                src={userThirdCardImage}
                alt="user-card2"
                id="uc3"
                width="70"
              ></img>
            )}
            <div id="user-count">{userValue}</div>
          </div>
          <button id="hit-btn" onClick={addCard}>
            HIT
          </button>
          <button id="stand-btn" onClick={end}>
            STAND
          </button>
        </div>
      ) : (
        <button onClick={start} id="start-btn">
          START GAME
        </button>
      )}
    </>
  );
}

export default BlackJack;
