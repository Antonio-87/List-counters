import './App.css';
import useStore from './hooks/useContext.ts';
import { observer } from 'mobx-react-lite';
import GeneratePaginationButtons from './components/generatePaginationButtons.tsx';
import MetersList from './components/metersList.tsx';

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const { meters } = useStore();
  return (
    <div className="meters-list-container">
      <MetersList meters={meters} onDeleteMeter={meters.afterDelete} />
      <GeneratePaginationButtons
        totalPages={meters.totalPages}
        setCurrentPage={meters.setCurrentPage}
      />
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);
