import {
  Button,
  Show,
  SimpleShowLayout,
  TextField,
  useUpdateMany,
} from "react-admin";

export function BlogShow(props: any) {
  const [updateMany] = useUpdateMany("blog", {
    ids: ["qy139h", "qs54ti", "76f1dm"],
    data: { title: "new titleaaaaa sasa" },
  });

  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="content" />
        <TextField source="author" />

        <Button
          title="Update"
          label="Update"
          onClick={() => {
            updateMany();
          }}
        />
      </SimpleShowLayout>
    </Show>
  );
}
