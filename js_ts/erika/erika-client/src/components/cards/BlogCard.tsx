import { Blog } from "../../../../erika/eicrud_exports/blog/blog.entity";
import { Card, CardContent } from "../ui/card";

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card>
      <CardContent>
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
      </CardContent>
    </Card>
  );
}
