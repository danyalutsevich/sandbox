import { useForm } from "@refinedev/react-hook-form";
import { useNavigate } from "react-router";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const StationEdit = () => {
  const navigate = useNavigate();

  const {
    refineCore: { onFinish },
    ...form
  } = useForm({
    refineCoreProps: {},
  });

  function onSubmit(values: Record<string, any>) {
    // Ensure lat/lng are numbers
    onFinish({
      ...values,
      lat: parseFloat(values.lat),
      lng: parseFloat(values.lng),
    });
  }

  return (
    <EditView>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Station name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter station name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Latitude */}
          <FormField
            control={form.control}
            name="lat"
            rules={{
              required: "Latitude is required",
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Latitude must be a number",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter latitude" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Longitude */}
          <FormField
            control={form.control}
            name="lng"
            rules={{
              required: "Longitude is required",
              pattern: {
                value: /^-?\d+(\.\d+)?$/,
                message: "Longitude must be a number",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter longitude" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Code */}
          <FormField
            control={form.control}
            name="code"
            rules={{ required: "Station code is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter station code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex gap-2">
            <Button
              type="submit"
              {...form.saveButtonProps}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </EditView>
  );
};
