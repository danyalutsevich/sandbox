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

export const TrainShow = () => {
  const { result: record, query } = useShow<{
    id: number;
    name: string;
    type: string;
    capacity: number;
    manufacturer: string;
    yearBuilt: number;
    status: string;
    avgSpeed: number;
    nextStation?: { id: number; name: string };
    route?: { id: number; name: string };
    schedules?: { id: number }[];
    createdAt: string;
    updatedAt: string;
  }>({});

  const {
    result: route,
    query: { isLoading: routeIsLoading },
  } = useOne({
    resource: "routes",
    id: record?.route?.id || "",
    queryOptions: { enabled: !!record?.route?.id },
  });

  const {
    result: station,
    query: { isLoading: stationIsLoading },
  } = useOne({
    resource: "stations",
    id: record?.nextStation?.id || "",
    queryOptions: { enabled: !!record?.nextStation?.id },
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
                <Badge
                  variant={
                    record?.status === "active" ? "default" : "secondary"
                  }
                >
                  {record?.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ID: {record?.id}
                </span>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Type</h4>
              <p className="text-sm text-muted-foreground">{record?.type}</p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Capacity</h4>
              <p className="text-sm text-muted-foreground">
                {record?.capacity}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Manufacturer</h4>
              <p className="text-sm text-muted-foreground">
                {record?.manufacturer}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Year Built</h4>
              <p className="text-sm text-muted-foreground">
                {record?.yearBuilt}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Average Speed</h4>
              <p className="text-sm text-muted-foreground">
                {record?.avgSpeed} km/h
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Next Station</h4>
              <p className="text-sm text-muted-foreground">
                {stationIsLoading ? "Loading..." : station?.name || "-"}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Route</h4>
              <p className="text-sm text-muted-foreground">
                {routeIsLoading ? "Loading..." : route?.name || "-"}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Schedules</h4>
              <p className="text-sm text-muted-foreground">
                {record?.schedules?.length ?? 0} schedule(s)
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Created At</h4>
              <p className="text-sm text-muted-foreground">
                {record?.createdAt
                  ? new Date(record.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-2">Updated At</h4>
              <p className="text-sm text-muted-foreground">
                {record?.updatedAt
                  ? new Date(record.updatedAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
