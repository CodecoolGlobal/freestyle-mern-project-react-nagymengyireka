import './Modal.css';

function Modal({ onClose, onPlayAgain, isWon }) {
    const handleClose = () => {
        onClose();
        //send patch request with outcome: game info pushed into history and balance updated
    }

    const handlePlayAgain = () => {
        onPlayAgain();
        //send patch request with outcome
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