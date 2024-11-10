import { Create, SimpleForm, TextInput } from "react-admin";

export function BlogCreate(props: any) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="content" />
        {/* <TextInput source="author" /> */}
      </SimpleForm>
    </Create>
  );
}
