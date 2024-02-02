import '../App.css'

function Header({balance}) {
    const balanceIconUrl= "https://i.ibb.co/GMSCpzf/coinPic.png"
    const casinoLogoUrl = 'https://i.ibb.co/b5S8JY8/cardDeck.png'
    return (
        <>
        <header>
        <h2>Casino Royale</h2>
        <h4>{balance}</h4>
        <img src={balanceIconUrl} alt="user-icon" id="user-icon-img" width="50"/>
        <img src={casinoLogoUrl} alt="balance-icon" id="bal-icon" width="35" height="35"/>


 
        </header>
        </>
    )
}

export default Header