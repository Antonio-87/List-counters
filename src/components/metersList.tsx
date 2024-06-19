import formatDate from '../functions/formatDate';
import HVS from '../assets/hvs.svg';
import GVS from '../assets/gvs.svg';
import deleteDefoult from '../assets/deleteDefoult.svg';
import deleteHover from '../assets/deleteHover.svg';
import { useState } from 'react';
import { MetersStoreType } from '../store/meters';

const MetersList = ({
  meters,
  onDeleteMeter,
}: {
  meters: MetersStoreType;
  onDeleteMeter: (id: string) => void;
}) => {
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
    <div>
      <header className="meters-list-header">
        <p>Список счетчиков</p>
      </header>
      <main>
        <table className="meters-list-table">
          <thead className="meters-list-table-title">
            <tr className="meters-list-tr-title">
              <th className="meters-list-th">№</th>
              <th className="meters-list-th">Тип</th>
              <th className="meters-list-th">Дата установки</th>
              <th className="meters-list-th">Автоматический</th>
              <th className="meters-list-th">Текущие показания</th>
              <th className="meters-list-th">Адрес</th>
              <th className="meters-list-th">Примечание</th>
            </tr>
          </thead>
          <tbody className="meters-list-table-body">
            {meters.meters &&
              meters.meters.map((meter) => {
                return (
                  <tr
                    className="meters-list-tr-body"
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
                        <img className="icon-type" src={GVS} alt="ГВС" />
                      </td>
                    ) : (
                      <td className="meters-list-td">
                        <img className="icon-type" src={HVS} alt="ГВС" />
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
                          className="icon-delete"
                          src={hoverDelete ? deleteHover : deleteDefoult}
                          onClick={() => onDeleteMeter(meter.id)}
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
