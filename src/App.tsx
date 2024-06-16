import './App.css';
import formatDate from './functions/formatDate.ts';
import HVS from './assets/hvs.svg';
import GVS from './assets/gvs.svg';
import useStore from './hooks/useContext.ts';
import { observer } from 'mobx-react-lite';

// eslint-disable-next-line react-refresh/only-export-components
function App() {
  const { meters, totalPages } = useStore();
  console.log(JSON.stringify(meters));

  const visiblePages = Array.from(
    { length: totalPages > 5 ? 5 : totalPages },
    (_, i) => i + 1
  );

  return (
    <div>
      <h1>Список счетчиков</h1>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Текущие показания</th>
            <th>Адрес</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {meters.meters &&
            meters.meters.map((meter, index: number) => {
              return (
                <tr key={meter.id}>
                  <td>{index + 1}</td>
                  {meter._type[0] === 'ColdWaterAreaMeter' ? (
                    <td>
                      <img src={GVS} alt="ГВС" />
                    </td>
                  ) : (
                    <td>
                      <img src={HVS} alt="ГВС" />
                    </td>
                  )}
                  <td>{formatDate(meter.installation_date)}</td>
                  <td>{meter.is_automatic ? 'да' : 'нет'}</td>
                  <td>{meter.initial_values[0].toFixed(4)}</td>
                  <td>{meter.address}</td>
                  <td>{meter.description}</td>
                  <td>
                    <button onClick={() => meters.deleteMeter(meter.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        {visiblePages.map((page) => (
          <button key={page} onClick={() => meters.setCurrentPage(page)}>
            {page}
          </button>
        ))}
        {totalPages > 5 && (
          <div>
            <select
              onChange={(e) => meters.setCurrentPage(parseInt(e.target.value))}
            >
              {Array.from({ length: totalPages - 5 }, (_, i) => i + 3).map(
                (page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                )
              )}
            </select>
            <button onClick={() => meters.setCurrentPage(totalPages)}>
              Last
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export default observer(App);
