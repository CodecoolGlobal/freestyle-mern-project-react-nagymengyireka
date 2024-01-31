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
        const data = await response.json();
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

    if (isWon === false || isWon === true) {
        return (
            <div className="modal-container">
                <div className="modal">
                    <h2>{isWon ? 'You Won!' : 'You Lost!'}</h2>
                    <p>Amount of lost or gained coins</p>
                    <div className="modal-buttons">
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