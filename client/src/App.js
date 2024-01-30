import './App.css';
import './components/Header'
import Header from './components/Header';

function App() {
  const user1IconUrl = 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'
  const balanceIconUrl= 'https://banner2.cleanpng.com/20180221/dpe/kisspng-money-gold-coin-icon-money-coins-5a8e30bcc3cc44.931351751519268028802.jpg'
  return (
    <div className="App">
      <Header userName={'Test'} balance={'001'} iconURL={user1IconUrl} balanceIcon={balanceIconUrl} />
    </div>
  );
}

export default App;
