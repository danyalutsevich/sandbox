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

export const ScheduleShow = () => {
  const { result: record, query } = useShow<{
    id: number;
    route: any;
    train: any;
    departureTime: string;
    arrivalTime: string;
    platform?: string;
    status?: string;
  }>({});

  const {
    result: route,
    query: { isLoading: routeIsLoading },
  } = useOne({
    resource: "routes",
    id: record?.route?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const {
    result: train,
    query: { isLoading: trainIsLoading },
  } = useOne({
    resource: "trains",
    id: record?.train?.id || "",
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
            <CardTitle>Schedule ID: {record?.id}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
                {record?.status && (
                  <Badge
                    variant={
                      record.status === "active" ? "default" : "secondary"
                    }
                  >
                    {record.status}
                  </Badge>
                )}
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Route */}
            <div>
              <h4 className="text-sm font-medium mb-2">Route</h4>
              <p className="text-sm text-muted-foreground">
                {routeIsLoading ? "Loading..." : route?.title || "-"}
              </p>
            </div>

            <Separator />

            {/* Train */}
            <div>
              <h4 className="text-sm font-medium mb-2">Train</h4>
              <p className="text-sm text-muted-foreground">
                {trainIsLoading ? "Loading..." : train?.name || "-"}
              </p>
            </div>

            <Separator />

            {/* Departure & Arrival */}
            <div>
              <h4 className="text-sm font-medium mb-2">Departure Time</h4>
              <p className="text-sm text-muted-foreground">
                {record?.departureTime
                  ? new Date(record.departureTime).toLocaleString()
                  : "-"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Arrival Time</h4>
              <p className="text-sm text-muted-foreground">
                {record?.arrivalTime
                  ? new Date(record.arrivalTime).toLocaleString()
                  : "-"}
              </p>
            </div>

            <Separator />

            {/* Platform */}
            <div>
              <h4 className="text-sm font-medium mb-2">Platform</h4>
              <p className="text-sm text-muted-foreground">
                {record?.platform || "-"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
