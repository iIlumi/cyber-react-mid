import { Editor } from '@tinymce/tinymce-react';
// import { useDispatch } from 'react-redux';
import { withFormik } from 'formik';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { GET_ALL_PRJ_CATEGORY_SAGA } from '../../redux/constants/Cyberbugs/Cyberbugs';

function FormEditProject(props) {
  //   const dispatchHook = useDispatch();
  //   const submitForm = (e) => {
  //     e.preventDefault();
  //     alert('submit edit');
  //   };

  const {
    values,
    // touched,
    // errors,
    handleChange,
    // handleBlur,
    handleSubmit,
    // setValues,
    setFieldValue,
    arrProjectCategory,
    dispatch,
  } = props;
  console.log('props:', props);

  //componentdidmount
  useEffect(() => {
    //Gọi api load project category

    //Load sự kiện submit lên drawer nút submit
    dispatch({
      type: 'SET_SUBMIT_EDIT_PROJECT',
      submitFunction: handleSubmit,
    });
    dispatch({ type: GET_ALL_PRJ_CATEGORY_SAGA });
  }, [dispatch]);

  const handleEditorChange = (content, editor) => {
    setFieldValue('description', content);
  };

  //   https://ant.design/components/drawer/#components-drawer-demo-form-in-drawer
  //   ref, tuy nhiên ở đây dùng BS
  // Nút submit ko nằm trong form mà nằm trên HOC bọc nó
  // Phải dispatch hàm submit lên redux để truyền vô HOC lấy

  return (
    <form className="container-fuild" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project id</p>
            <input
              disabled
              className="form-control"
              name="id"
              value={values.id}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project name</p>
            <input
              className="form-control"
              name="projectName"
              value={values.projectName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              className="form-control"
              name="categoryId"
              defaultValue={values.categoryId}
            >
              {arrProjectCategory?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description_drawer"
              apiKey="hne9imm2uv75ei85awm7wtyi1tmp59rqr6x20g9omuq0fp4i"
              initialValue={values.description}
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

const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;

    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('values', values);
  },
  displayName: 'EditProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(EditProjectForm);
