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
};

type Train = {
  id: number;
  name: string;
};

type Route = {
  id: number;
  name: string;
  originStation: Station;
  destinationStation: Station;
  trains: Train[];
  distance: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export const RouteList = () => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Route>();

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
      columnHelper.accessor("originStation", {
        id: "originStation",
        header: "Origin Station",
        cell: ({ getValue }) => getValue()?.name ?? "-",
      }),
      columnHelper.accessor("destinationStation", {
        id: "destinationStation",
        header: "Destination Station",
        cell: ({ getValue }) => getValue()?.name ?? "-",
      }),
      columnHelper.accessor("trains", {
        id: "trains",
        header: "Trains",
        cell: ({ getValue }) => {
          const trains = getValue();
          if (!trains || trains.length === 0) return "-";
          return trains.map((t) => t.name).join(", ");
        },
      }),
      columnHelper.accessor("distance", {
        id: "distance",
        header: "Distance (km)",
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
      columnHelper.accessor("updatedAt", {
        id: "updatedAt",
        header: "Updated At",
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
        size: 220,
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
      <ListViewHeader title="Routes" />
      <DataTable table={table} />
    </ListView>
  );
};
