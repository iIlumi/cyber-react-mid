import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PRJ_CATEGORY_SAGA } from '../../../redux/constants/Cyberbugs/Cyberbugs';

function CreateProject(props) {
  function handleEditorChange(value, editor) {
    // console.log('editor:', editor);
    console.log('value:', value);
  }

  const dispatch = useDispatch();
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  // handleChange dc formik định nghĩa sẵn, ko custom được
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({ type: GET_ALL_PRJ_CATEGORY_SAGA });
  }, [dispatch]);

  console.log('createPrj re-render');

  return (
    <div className="container m-5">
      <h3>CreateProject</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
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
              selector: 'textarea#myTextArea',
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
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
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
  mapPropsToValues: (props) => {
    console.log('mapPropsToValues', props);
    return {
      projectName: '',
      description: '',
    };
  },

  validationSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('handleSubmit props', props);
  },

  displayName: 'CreateProjectFormik',
})(CreateProject);

export default connect()(createProjectForm);

/**
 * ở đây mỗi khi gõ trong Editor thì form ko re-render
 * Tuy nhiên gọ title hoặc chọn option thì gây re-render toàn bộ form
 * Lại connect lên redux lấy state mới về
 * -> useEffect ở đây chỉ chạy khi mount
 */
