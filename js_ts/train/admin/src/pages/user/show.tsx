import { useShow } from "@refinedev/core";
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

export const UserShow = () => {
  const { result: record, query } = useShow();
  const { isLoading } = query;

  if (isLoading) return <p>Loading...</p>;

  return (
    <ShowView>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{record?.username}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-4">
                <Badge
                  variant={record?.role === "admin" ? "default" : "secondary"}
                >
                  {record?.role}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  ID: {record?.id}
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div>
              <h4 className="text-sm font-medium mb-2">Email</h4>
              <p className="text-sm text-muted-foreground">
                {record?.email || "-"}
              </p>
            </div>

            <Separator />

            {/* Reset Password Token */}
            <div>
              <h4 className="text-sm font-medium mb-2">Reset Password Token</h4>
              <p className="text-sm text-muted-foreground">
                {record?.resetPasswordToken || "Not set"}
              </p>
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
