import './Modal.css';

function Modal({ onClose, onPlayAgain, isWon, balance, name, playerId }) {
    const game = {
        type: name,
        isWon: isWon,
        coins: balance
    }

    const patchGame = async () => {
        const response = await fetch(`/api/users/${playerId}/history`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game)
        });
        const data = await response.json(); //if status is 200 setBalance, if not then don't => next tw week
        return data;
    }

    const handleClose = async () => {
        await patchGame();
        onClose();
    }

    const handlePlayAgain = async () => {
        await patchGame();
        onPlayAgain();
    }

    if ((isWon === false && balance) || (isWon === true && balance)) {
        return (
            <div id="modal-container">
                <div id="modal">
                    <h2>{isWon ? 'You Won!' : 'You Lost!'}</h2>
                    <p>{isWon ? `+ ${balance} coins gained` : `- ${balance} coins lost`}</p>
                    <div id="modal-buttons">
                        <button onClick={handleClose}>To Main Page</button>
                        <button onClick={handlePlayAgain}>Play Again</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Modal;