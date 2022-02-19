import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function CreateProject(props) {
  function handleEditorChange(value, editor) {
    console.log('editor:', editor)
    console.log('value:', value);
  }

  return (
    <div className="container m-5">
      <h3>CreateProject</h3>
      <form className="container">
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            initialValue="hello editor"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help',
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select name="categoryId" className="form-control">
            <option>Software</option>
            <option>Web</option>
            <option>App</option>
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}

/**
 *
 * https://ourcodeworld.com/articles/read/1065/top-15-best-rich-text-editor-components-wysiwyg-for-reactjs
 *
 * https://www.tiny.cloud/docs/integrations/react/
 * name của các thẻ input nên đặt giống cấu trúc của API trả về cho tiện
 *
 * https://www.tiny.cloud/docs/integrations/react/#exampleclasscontrolledcomponent
 * useRef vs onEditorChange
 */
