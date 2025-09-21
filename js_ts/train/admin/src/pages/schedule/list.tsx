import { useList } from "@refinedev/core";
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

type Schedule = {
  id: string;
  route: { id: string; name: string };
  train: { id: string; name: string };
  departureTime: string;
  arrivalTime: string;
  platform?: string | null;
};

export const ScheduleList = () => {
  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Schedule>();

    return [
      columnHelper.accessor("id", {
        id: "id",
        header: "ID",
      }),
      columnHelper.accessor("route.name", {
        id: "route",
        header: "Route",
        cell: ({ row }) => row.original.route?.name || "-",
      }),
      columnHelper.accessor("train.name", {
        id: "train",
        header: "Train",
        cell: ({ row }) => row.original.train?.name || "-",
      }),
      columnHelper.accessor("departureTime", {
        id: "departureTime",
        header: "Departure",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "-",
      }),
      columnHelper.accessor("arrivalTime", {
        id: "arrivalTime",
        header: "Arrival",
        cell: ({ getValue }) =>
          getValue() ? new Date(getValue()).toLocaleString() : "-",
      }),
      columnHelper.accessor("platform", {
        id: "platform",
        header: "Platform",
        cell: ({ getValue }) => getValue() || "-",
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
      }),
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: { syncWithLocation: true },
  });

  return (
    <ListView>
      <ListViewHeader title="Schedules" />
      <DataTable table={table} />
    </ListView>
  );
};
