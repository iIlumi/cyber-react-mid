import React from 'react';

export default function DemoHOCModal() {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => {}}
      >
        Đăng nhập
      </button>

      <button
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
        onClick={() => {}}
      >
        Đăng ký
      </button>
    </div>
  );
}
