import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { connect, useDispatch } from 'react-redux';

function CreateProject(props) {
  //   function handleEditorChange(value, editor) {
  //     console.log('editor:', editor)
  //     console.log('value:', value);
  //   }
  const dispatch = useDispatch();


  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' });
  }, [dispatch]);

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
            apiKey="hne9imm2uv75ei85awm7wtyi1tmp59rqr6x20g9omuq0fp4i"
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
            // onEditorChange={handleEditorChange}
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

const createProjectForm = withFormik({
  mapPropsToValues: () => ({}),
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {},
  displayName: 'CreateProjectFormik',
})(CreateProject);

export default connect()(createProjectForm);
