import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { resultInitialState } from "../../questions";

const DragAndDrop = ({ choices }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Extract items from choices and set them as the first column
    const firstColumn = {
      name: "Items",
      items: choices.reduce((acc, choice) => {
        const { items } = Object.values(choice)[0];
        return [...acc, ...items];
      }, []),
    };

    // Create the rest of the columns based on the choices
    const otherColumns = choices.map((choice) => {
      const { name, items } = Object.values(choice)[0];
      return { name, items: [] };
    });

    setColumns([firstColumn, ...otherColumns]);
  }, [choices]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (column) => column.name === source.droppableId
      );
      const destColumn = columns.find(
        (column) => column.name === destination.droppableId
      );
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((column) => {
          if (column.name === source.droppableId) {
            return { ...column, items: sourceItems };
          } else if (column.name === destination.droppableId) {
            return { ...column, items: destItems };
          }
          return column;
        });

        return updatedColumns;
      });
    } else {
      const column = columns.find((column) => column.name === source.droppableId);
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns((prevColumns) => {
        const updatedColumns = prevColumns.map((column) => {
          if (column.name === source.droppableId) {
            return { ...column, items: copiedItems };
          }
          return column;
        });

        return updatedColumns;
      });
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Drag and Drop</h1>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((column) => (
            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
                        background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item} draggableId={item} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: 16,
                                margin: "0 0 8px 0",
                                minHeight: "50px",
                                backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                                color: "white",
                                ...provided.draggableProps.style,
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
    </div>
  );
};

export default DragAndDrop;
