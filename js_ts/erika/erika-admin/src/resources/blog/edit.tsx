import { Edit, SimpleForm, TextInput } from "react-admin";

export function BlogEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="content" />
      </SimpleForm>
    </Edit>
  );
}
