import { useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView, ListViewHeader } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";

type Train = {
  id: string;
  name: string;
  type: string;
  capacity: string;
  manufacturer: string;
  yearBuilt: number;
  status: string;
  avgSpeed: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export const TrainList = () => {

  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Train>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
        enableSorting: false,
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        enableSorting: true,
      }),
      columnHelper.accessor("type", {
        id: "type",
        header: "Type",
        enableSorting: false,
      }),
      columnHelper.accessor("manufacturer", {
        id: "manufacturer",
        header: "Manufacturer",
        enableSorting: false,
      }),
      columnHelper.accessor("yearBuilt", {
        id: "yearBuilt",
        header: "Year Built",
        enableSorting: true,
      }),
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        header: "Created At",
        enableSorting: true,
        cell: ({ getValue }) => {
          const date = getValue();
          return date ? new Date(date).toLocaleDateString() : "-";
        },
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
        size: 290,
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
    <ListView >
      <ListViewHeader title="Train" />
      <DataTable table={table} />
    </ListView>
  );
};
