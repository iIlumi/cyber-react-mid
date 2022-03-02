import React, { useRef, useState } from 'react';

const defaultValue = [
  { id: 1, taskName: 'Task 1' },
  { id: 2, taskName: 'Task 2' },
  { id: 3, taskName: 'Task 3' },
  { id: 4, taskName: 'Task 4' },
  { id: 5, taskName: 'Task 5' },
];

// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#drag_events
// start, onDrag, end -> thẻ nguồn
// enter, over, leave, drop -> khu vực thả, hứng item

// onDrag (chỉ nhảy 1 lần thẻ đang kéo - ít dùng)
// Enter (1 lần - ít dùng) >< over - check over ms nhưng của khu vực
// leave - rời khu vực đang check - ít dùng

// Thường sẽ bắt start và over

export default function DemoDragDrop(props) {
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDrag = useRef({});

  const handleDragStart = (e, task, index) => {
    // Lấy thông tin thẻ
    console.log('tag', e.target);
    console.log('task', task);
    // console.log('index',index);

    //Lưu lại giá trị của task đang drag
    // ko dùng state lưu lại giá trị này sẽ gây lỗi ko kiểm soát
    tagDrag.current = task;
  };

  const handleDragEnter = (e, taskDragEnter, index) => {
    // console.log('dragEnterTag',e.target)
    // console.log('targertOver',task)
    // console.log('index',index)

    let taskListUpdate = [...taskList];
    //Láy ra index thằng đang kéo
    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );
    //Lấy ra index thằng bị kéo qua
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );

    // Thực chất ở đây chỉ sway [a,b] = [b,a]
    // ko reorder như kiểu chèn vô nên có nhiều cách giải quyết
    // Tuy nhiên gán temp là cách phổ thông nhất
    
    //Biến chứa giá trị thằng đang kéo
    let temp = taskListUpdate[indexDragTag];
    //Lấy giá trị tại vi trí đang kéo gán = thằng kéo qua
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    //Lấy thằng kéo qua gán = đang keo
    taskListUpdate[indexDragEnter] = temp;

    setTaskList(taskListUpdate);
  };

  const handleDragOver = (e) => {
    // console.log('targertOver',e.target)
  };

  const handleDragEnd = (e) => {
    // console.log('dragEnd', e.target);
  };
  const handleDrop = (e) => {
    console.log('drop', e.target);
  };

  return (
    <div className="container">
      <div className="text-center display-4">Task list</div>
      <div className="row">
        <div className="col-2"></div>
        <div className="bg-dark p-5 col-4">
          {taskList.map((task, index) => {
            return (
              <div
                key={index}
                className="bg-success text-white m-1 p-3"
                draggable="true"
                onDragStart={(e) => {
                  handleDragStart(e, task, index);
                }}
                onDragEnter={(e) => {
                  handleDragEnter(e, task, index);
                }}

                // onDragEnter={handleDragOver}
                // onDragEnd={(e) => {
                //   handleDragEnd(e);
                // }}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>

        <div
          className="col-2 bg-primary"
          style={{ height: 500 }}
          onDrop={(e) => {
            handleDrop(e);
          }}
          // Muốn bắt được onDrop phải disable DragOver như bên dưới
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          Drop Zone
        </div>
      </div>
    </div>
  );
}
