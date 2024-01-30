import '../App.css'

function Header({userName, balance, balanceIcon, iconURL}) {
    return (
        <>
        <header>
        <h4>{userName} {balance}</h4>
        <img src={iconURL} alt="user-icon" id="user-icon-img" width="50"/>
        <img src={balanceIcon} alt="balance-icon" id="bal-icon" width="50" height="50"/>
 
        </header>
        </>
    )
}

export default Header