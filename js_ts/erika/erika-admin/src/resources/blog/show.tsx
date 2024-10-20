import { Show, SimpleShowLayout, TextField } from "react-admin";

export function BlogShow(props: any) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="content" />
        <TextField source="author" />
      </SimpleShowLayout>
    </Show>
  );
}
