import s from "./ProfileForm.module.scss";
import Card from "../Card/Card";
import { Formik, Form, Field } from "formik";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { updateUserDetails } from "../../api";
function ProfileForm({ profile, onCancel, onSucces }) {
  const save = async (values) => {
    await updateUserDetails(profile.id, values);
    onSucces();
  };
  return (
    <Card padding>
      <h1>Edit Form </h1>

      <Formik
        initialValues={{
          username: profile.username,
          email: profile.email,
          bio: profile.bio || "",
          birthday: profile.birthday || "",
          location: profile.location || "",
        }}
        onSubmit={save}
      >
        <Form>
          <Field
            as={Input}
            name="username"
            placeholder="Enter your username..."
            label="Username"
          />
          <Field as={Input} name="email" type="email" disabled label="Email" />
          <Field
            as={Input}
            name="bio"
            type="textarea"
            placeholder="Enter your bio..."
            label="Bio"
          />
          <Field
            as={Input}
            name="birthday"
            type="date"
            placeholder="Enter your date..."
            label="Birthday"
          />
          <Field
            as={Input}
            name="location"
            placeholder="Enter your location..."
            label="Location"
          />

          <div className={s.actionsWrapper}>
            <Button type="submit" variant="regular" color="primary">
              Save
            </Button>
            <Button variant="outline" color="primary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Formik>
    </Card>
  );
}

export default ProfileForm;
