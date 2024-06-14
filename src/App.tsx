import './App.css';
import useStore from './hooks/useContext.ts';
import { observer } from 'mobx-react-lite';

function App() {
  const { meters } = useStore();
  console.log(JSON.stringify(meters));
  return <div>Start</div>;
}

export default observer(App);
