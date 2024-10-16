import {
  Datagrid,
  Filter,
  List,
  Pagination,
  TextField,
  TextInput,
} from "react-admin";

export function BlogList(props: any) {
  return (
    <List
      {...props}
      pagination={
        <Pagination
          rowsPerPageOptions={[1, 5, 10, 50, 100, 500]}
          defaultValue={10}
          defaultChecked
        />
      }
      filters={
        <Filter>
          <TextInput source="title" alwaysOn />
          <TextInput source="content" alwaysOn />
          <TextInput source="author" alwaysOn />
        </Filter>
      }
    >
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="content" />
        <TextField source="author" />
      </Datagrid>
    </List>
  );
}
