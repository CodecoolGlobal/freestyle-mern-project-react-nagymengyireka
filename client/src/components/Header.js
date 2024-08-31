import '../App.css'
function Header({ balance, logOut }) {
    const balanceIconUrl = "https://pngimg.com/uploads/coin/coin_PNG36871.png"

    return (
        <>
        <header>
        <h2>Casino Royale</h2>
        <h4>{balance}</h4>
        <img src={balanceIconUrl} alt="user-icon" id="user-icon-img" width="50"/>
        <img src="deck_image.png" alt="balance-icon" id="bal-icon" width="35" height="35"/>
        <img src='logout_image.png' alt='Logout' onClick={logOut} className='logout'/>
        </header>
        </>
    )
}

export default Header