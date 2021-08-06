import React from 'react';
import api from './apis';

const {testApi} = api;

function App() {
  testApi({name: 123}).then((res: any) => {
    console.log(res)
  })

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
