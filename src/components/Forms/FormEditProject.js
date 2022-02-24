import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function FormEditProject(props) {
  const dispatchHook = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();
    alert('submit edit');
  };

  //componentdidmount
  useEffect(() => {
    dispatchHook({
      type: 'SET_SUBMIT_EDIT_PROJECT',
      submitFunction: submitForm,
    });
  }, [dispatchHook]);

  const handleEditorChange = (content, editor) => {
    // setFieldValue('description', content)
  };

  //   https://ant.design/components/drawer/#components-drawer-demo-form-in-drawer
  //   ref, tuy nhiên ở đây dùng BS
  // Nút submit ko nằm trong form mà nằm trên HOC bọc nó
  // Phải dispatch hàm submit lên redux để truyền vô HOC lấy
  return (
    <form className="container-fuild" onSubmit={submitForm}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input disabled className="form-control" name="id" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input className="form-control" name="projectName" />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <input className="form-control" name="projectName" />
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description_drawer"
              apiKey="hne9imm2uv75ei85awm7wtyi1tmp59rqr6x20g9omuq0fp4i"
              init={{
                selector: 'textarea#myTextArea',

                height: 500,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help',
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
