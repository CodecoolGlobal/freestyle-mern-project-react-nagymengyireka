import { useEffect, useState } from "react";

function BlackJack() {
  const [deckID, setDeckID] = useState(null);
  const [dealerImage, setDealerImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [cardFetched, setCardFetched] = useState(false);
  let [userCardValue, setUserCardValue] = useState("");
  let [dealerCardValue, setDealerCardValue] = useState("");

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
          `https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`
        );
        const data = await response.json();
        console.log("CARD", data);
        setDealerImage(data.cards?.[0]?.image);
        setDealerCardValue(data.cards?.[0].code.charAt(0));
        setUserImage(data.cards?.[1]?.image);
        setUserCardValue(data.cards?.[1].code.charAt(0));
      };
      fetchCards();
      setCardFetched(true);
    }
  }, [deckID, cardFetched]);

  const checkNumber = /^[1-9]+$/;
  const dealerValue = checkNumber.test(dealerCardValue) ? parseInt(dealerCardValue) : dealerCardValue === "A" ? 11 : userCardValue === "0" ? 10 : 10
  const userValue = checkNumber.test(userCardValue) ? parseInt(userCardValue) : userCardValue === "A" ? 11 : userCardValue === "0" ? 10 : 10

  return (
    <>
      <img
        src="https://i.ibb.co/xLHhP82/packofcards.png"
        alt="deck"
        id="deck"
        width="120"
      ></img>
      {dealerImage && (
        <img src={dealerImage} alt="dealer-card" id="dc" width="70" />
      )}
      <div id="dealer-count">
        {dealerValue}
      </div>
      {userImage && <img src={userImage} alt="user-card" id="uc" width="70" />}
      <div id="user-count">
        {userValue}
      </div>
    </>
  );
}

export default BlackJack;
