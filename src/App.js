import React from 'react';

import RuleTable from './RuleTable';
import './App.css';
 import myData from './rulesData.json'
 
 
const App = () => {

  return (
<div>
<h1>Movie Telecast Rules</h1>
<RuleTable rules={myData} />
</div>

  );

};
 
export default App;

 
