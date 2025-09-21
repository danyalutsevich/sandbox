import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";

type Station = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export const StationList = () => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Station>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
        enableSorting: true,
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableSorting: true,
      }),
      columnHelper.accessor("lat", {
        id: "lat",
        header: "Latitude",
        enableSorting: true,
        cell: ({ getValue }) => getValue()?.toFixed(6),
      }),
      columnHelper.accessor("lng", {
        id: "lng",
        header: "Longitude",
        enableSorting: true,
        cell: ({ getValue }) => getValue()?.toFixed(6),
      }),
      columnHelper.accessor("code", {
        id: "code",
        header: "Code",
        enableSorting: true,
      }),
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Created At",
        enableSorting: true,
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "-",
      }),
      columnHelper.accessor("updatedAt", {
        id: "updatedAt",
        header: "Updated At",
        enableSorting: true,
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "-",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <EditButton recordItemId={row.original.id} size="sm" />
            <ShowButton recordItemId={row.original.id} size="sm" />
            <DeleteButton recordItemId={row.original.id} size="sm" />
          </div>
        ),
        enableSorting: false,
        size: 200,
      }),
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: {
      syncWithLocation: true,
    },
  });

  return (
    <ListView>
      <ListViewHeader title="Station" />
      <DataTable table={table} />
    </ListView>
  );
};
