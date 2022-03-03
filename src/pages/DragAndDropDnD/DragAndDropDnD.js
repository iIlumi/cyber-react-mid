import React, { useState } from 'react';
import _ from 'lodash';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function DragAndDropDnD(props) {
  const [state, setState] = useState({
    toDo: {
      id: 'toDo',
      items: [
        { id: '1', taskName: 'Task 1' },
        { id: '2', taskName: 'Task 2' },
        { id: '3', taskName: 'Task 3' },
      ],
    },
    inProgress: {
      id: 'inProgress',
      items: [
        { id: '4', taskName: 'Task 4' },
        { id: '5', taskName: 'Task 5' },
        { id: '6', taskName: 'Task 6' },
      ],
    },
    done: {
      id: 'done',
      items: [
        { id: '7', taskName: 'Task 7' },
        { id: '8', taskName: 'Task 8' },
        { id: '9', taskName: 'Task 9' },
      ],
    },
  });

  return (
    <div className="container">
      <h3 className="text-center display-4">Demo DraggAndDropp DND</h3>

      <DragDropContext>
        <div className="row">
          {_.map(state, (statusTask, index) => {
            return (
              // droppableId nhận 1 string
              <Droppable droppableId={statusTask.id} key={index}>
                {(provided) => {
                  return (
                    <div className="col-4">
                      <div
                        className="bg-dark p-5"
                        key={index}
                        // Phải truyền ref và các props vào
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <h3 className="text-white">{statusTask.id}</h3>
                        {statusTask.items.map((item, index) => {
                          return (
                            <Draggable
                              // Key ở đây phân biệt nhau, ko bị render lại theo index, key này là string
                              key={item.id}
                              // index là vị trí sau khi thay đổi
                              index={index}
                              // draggableId là giá trị trả ra sau khi thay đổi
                              draggableId={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    // Phải truyền ref- props-handle Vào mới drag-drop được
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mt-2 p-2 bg-white text-center"
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {/* placeholder do thư viện cần */}
                        {provided.placeholder}
                      </div>
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
