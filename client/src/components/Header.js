import '../App.css'

function Header({casinoLogo, balance, balanceIcon, iconURL}) {
    return (
        <>
        <header>
        <h2>Casino Royale</h2>
        <h4>{balance}</h4>
        <img src={casinoLogo} alt="user-icon" id="casino-icon-img" width="90"/>
        <img src={iconURL} alt="user-icon" id="user-icon-img" width="50"/>
        <img src={balanceIcon} alt="balance-icon" id="bal-icon" width="35" height="35"/>


 
        </header>
        </>
    )
}

export default Header