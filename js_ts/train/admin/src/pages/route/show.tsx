import { useOne, useShow } from "@refinedev/core";

import { ShowView } from "@/components/refine-ui/views/show-view";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const RouteShow = () => {
  const { result: record, query } = useShow({});

  // Fetch origin station
  const {
    result: originStation,
    query: { isLoading: originLoading },
  } = useOne({
    resource: "station",
    id: record?.originStation?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  // Fetch destination station
  const {
    result: destinationStation,
    query: { isLoading: destinationLoading },
  } = useOne({
    resource: "station",
    id: record?.destinationStation?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { isLoading } = query;

  return (
    <ShowView>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.name}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
                <Badge variant="default">ID: {record?.id}</Badge>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Distance */}
            <div>
              <h4 className="text-sm font-medium mb-2">Distance (km)</h4>
              <p className="text-sm text-muted-foreground">
                {record?.distance ?? "-"}
              </p>
            </div>

            <Separator />

            {/* Origin Station */}
            <div>
              <h4 className="text-sm font-medium mb-2">Origin Station</h4>
              <p className="text-sm text-muted-foreground">
                {originLoading ? "Loading..." : originStation?.name || "-"}
              </p>
            </div>

            <Separator />

            {/* Destination Station */}
            <div>
              <h4 className="text-sm font-medium mb-2">Destination Station</h4>
              <p className="text-sm text-muted-foreground">
                {destinationLoading
                  ? "Loading..."
                  : destinationStation?.name || "-"}
              </p>
            </div>

            <Separator />

            {/* Created At */}
            <div>
              <h4 className="text-sm font-medium mb-2">Created At</h4>
              <p className="text-sm text-muted-foreground">
                {record?.createdAt
                  ? new Date(record.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
