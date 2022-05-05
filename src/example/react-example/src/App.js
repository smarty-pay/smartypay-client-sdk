import './App.css';
import {SmartyPayButton} from 'smartypay-client-sdk';
import {useLayoutEffect, useRef} from "react";

function App() {

  const ref = useRef();
  const parent = ref.current;

  useLayoutEffect(()=>{
    if(parent){
      new SmartyPayButton({
        target: 'test',
        apiKey: 'YOUR_API_KEY',
        amount: '1.99',
        token: 'bUSDT',
        lang: 'en',
        theme: 'dark',
      })
    }
  }, [parent]);

  return (
    <div id="test" className="App" ref={ref}>

    </div>
  );
}

export default App;
