import { RouterView } from 'mobx-state-router';
import './App.css';
import { viewMap } from './Routing/ViewMap';

function App() {
  return (
    <div className="App">
      <RouterView viewMap={viewMap} />
    </div>
  );
}

export default App;
