/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useState, useEffect } from 'react';

import httpService from '../../utils/http-service';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// eslint-disable-next-line react/prop-types
const DragAndDrop = (choices) => {
  const [columns, setColumns] = useState([]);
  const [getResult, setResult] = useState(null);
  let [getStartTime, setStartTime] = useState([]);

  useEffect(() => {
    // Extract items from choices and set them as the first column
    const firstColumn = {
      name: 'Items',
      items: choices.answers
    };

    // Create the rest of the columns based on the choices
    const otherColumns = choices.categories.map((category) => {
      return { name: category, items: [] };
    });

    setStartTime(new Date());

    setColumns([firstColumn, ...otherColumns]);
  }, [choices]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find((column) => column.name === source.droppableId);
      const destColumn = columns.find((column) => column.name === destination.droppableId);
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((column) => {
          if (column.name === source.droppableId) {
            return { ...column, items: sourceItems };
          }
          if (column.name === destination.droppableId) {
            return { ...column, items: destItems };
          }
          return column;
        });

        return updatedColumns;
      });
    } else {
      const column = columns.find((_column) => _column.name === source.droppableId);
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((_column) => {
          if (_column.name === source.droppableId) {
            return { ..._column, items: copiedItems };
          }
          return _column;
        });

        return updatedColumns;
      });
    }
  };

  function updateStatistic(res, endTime) {
    const time = Math.abs(getStartTime.getTime() - endTime.getTime()) / 1000;
    const body = {
      userId: sessionStorage.getItem('userid'),
      isCorrect: res.result === 'correct' ? 'true' : 'false',
      time: time, // TODO: Zeit messen für die Beantwortung der Frage.
      domain: res.domain,
      type: typeof choices[0] === 'string' ? 'sort' : 'category'
    };
    httpService.patchJSON(`api/statistic/${choices._id}`, body).then((response) => {
      if (response.status !== 200) {
        console.log('Can not update statistic');
      }
    });
  }

  const validateAnswer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let data = [];
    if (Object.keys(columns).length > 1 && columns[0].items.length !== 0) return;
    if (columns.length > 1) {
      columns
        .forEach((el) => {
          if (el.name !== 'Items') {
            data.push({ key: el.name, value: el.items });
          }
        })
        .filter((el) => el);
    }

    if (columns.length === 1) {
      data = columns[0].items;
    }
    httpService
      .postJSON(`api/question/${choices._id}`, { answer: data, items: choices.answers })
      .then((response) => response.json())
      .then((res) => {
        setResult(data);
        const result = [];
        if (columns.length > 1) {
          result.push(columns[0]);
          res.correctAnswer.forEach((el) => {
            result.push({ name: el.key, items: el.value });
          });
        } else {
          result.push({ name: 'Items', items: res.correctAnswer });
        }
        setColumns(result);
        const endTime = new Date(new Date());
        updateStatistic(res, endTime);
      });

    columns.forEach((column) => {
      column.items.forEach((item) => {
        const item_id = document.querySelector(`[data-rbd-draggable-id='${item}']`);
        const parent_id = item_id.parentNode.getAttribute('data-rbd-droppable-id');
        const backgroundColor = parent_id === column.name ? 'green' : 'red';

        if (item_id) {
          item_id.style.backgroundColor = backgroundColor;
        }
      });
    });
  };

  return (
    <div>
      <p style={{ textAlign: 'center' }}>{choices.question}</p>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              key={column.name}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={column.name} key={column.name}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 500
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(dragProvided, dragSnapshot) => (
                            <div
                              ref={dragProvided.innerRef}
                              {...dragProvided.draggableProps}
                              {...dragProvided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: 16,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                backgroundColor: dragSnapshot.isDragging ? '#263B4A' : '#456C86',
                                color: 'white',
                                ...dragProvided.draggableProps.style
                              }}
                            >
                              {item}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </DragDropContext>
      </div>
      {getResult ? (
        <button
          onClick={(e) => {
            setResult(null);
            choices.next(e);
          }}
          type="submit"
        >
          Nächste Frage
        </button>
      ) : (
        <button onClick={(e) => validateAnswer(e)}>Weiter</button>
      )}
    </div>
  );
};

export default DragAndDrop;
