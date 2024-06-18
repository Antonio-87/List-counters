import formatDate from '../functions/formatDate';
import HVS from '../assets/hvs.svg';
import GVS from '../assets/gvs.svg';
import deleteDefoult from '../assets/deleteDefoult.svg';
import deleteHover from '../assets/deleteHover.svg';
import useStore from '../hooks/useContext';
import { useState } from 'react';

const MetersList = () => {
  const { meters } = useStore();
  const [hoverDelete, setHoverDelete] = useState<boolean>(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  let startCount = meters.currentPage * 20 - 19;

  let buttons = [];

  if (meters.totalPages <= 6) {
    buttons = Array.from({ length: meters.totalPages }, (_, i) => i + 1);
  } else {
    buttons = [1, 2, 3];
    buttons.push(0);
    buttons = buttons.concat(
      Array.from({ length: 3 }, (_, i) => meters.totalPages - 2 + i)
    );
  }

  return (
    <div className="meters-list-container">
      <header className="meters-list-header">
        <h1>Список счетчиков</h1>
      </header>
      <main>
        <table className="meters-list-table">
          <thead className="meters-list-table-title">
            <tr>
              <th className="meters-list-th number">№</th>
              <th className="meters-list-th type">Тип</th>
              <th className="meters-list-th">Дата установки</th>
              <th className="meters-list-th">Автоматический</th>
              <th className="meters-list-th">Текущие показания</th>
              <th className="meters-list-th">Адрес</th>
              <th className="meters-list-th description">Примечание</th>
              <th className="meters-list-th"></th>
            </tr>
          </thead>
          <tbody className="meters-list-body">
            {meters.meters &&
              meters.meters.map((meter) => {
                return (
                  <tr
                    className="meters-list-tr"
                    key={meter.id}
                    onMouseEnter={() => {
                      setHoveredRowId(meter.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredRowId(null);
                    }}
                  >
                    <td className="meters-list-td">{startCount++}</td>
                    {meter._type[0] === 'ColdWaterAreaMeter' ? (
                      <td className="meters-list-td">
                        <img src={GVS} alt="ГВС" />
                      </td>
                    ) : (
                      <td className="meters-list-td">
                        <img src={HVS} alt="ГВС" />
                      </td>
                    )}
                    <td className="meters-list-td">
                      {formatDate(meter.installation_date)}
                    </td>
                    <td className="meters-list-td">
                      {meter.is_automatic ? 'да' : 'нет'}
                    </td>
                    <td className="meters-list-td">
                      {meter.initial_values[0].toFixed(4)}
                    </td>
                    <td className="meters-list-td">{meter.address}</td>
                    <td className="meters-list-td">{meter.description}</td>
                    <td className="meters-list-td">
                      {hoveredRowId === meter.id && (
                        <img
                          src={hoverDelete ? deleteHover : deleteDefoult}
                          onClick={() => meters.deleteMeter(meter.id)}
                          onMouseEnter={() => {
                            setHoverDelete(true);
                          }}
                          onMouseLeave={() => {
                            setHoverDelete(false);
                          }}
                          alt="Delete"
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MetersList;
