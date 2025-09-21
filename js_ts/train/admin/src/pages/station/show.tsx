import { useShow } from "@refinedev/core";

import { ShowView } from "@/components/refine-ui/views/show-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const StationShow = () => {
  const { result: record, query } = useShow();
  const { isLoading } = query;

  if (isLoading) return <p>Loading...</p>;

  return (
    <ShowView>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.name}</CardTitle>
            <CardDescription>
              <span className="text-sm text-muted-foreground">
                ID: {record?.id}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Latitude */}
            <div>
              <h4 className="text-sm font-medium mb-2">Latitude</h4>
              <p className="text-sm text-muted-foreground">{record?.lat}</p>
            </div>

            <Separator />

            {/* Longitude */}
            <div>
              <h4 className="text-sm font-medium mb-2">Longitude</h4>
              <p className="text-sm text-muted-foreground">{record?.lng}</p>
            </div>

            <Separator />

            {/* Code */}
            <div>
              <h4 className="text-sm font-medium mb-2">Station Code</h4>
              <p className="text-sm text-muted-foreground">{record?.code}</p>
            </div>

            <Separator />

            {/* Created At */}
            <div>
              <h4 className="text-sm font-medium mb-2">Created At</h4>
              <p className="text-sm text-muted-foreground">
                {record?.createdAt
                  ? new Date(record.createdAt).toLocaleString()
                  : "-"}
              </p>
            </div>

            <Separator />

            {/* Updated At */}
            <div>
              <h4 className="text-sm font-medium mb-2">Updated At</h4>
              <p className="text-sm text-muted-foreground">
                {record?.updatedAt
                  ? new Date(record.updatedAt).toLocaleString()
                  : "-"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};
