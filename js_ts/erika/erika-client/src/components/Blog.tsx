import { useState } from "react";
import { sp } from "../client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BlogCard } from "./cards/BlogCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function Blog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const createPost = useMutation({
    mutationFn: async () => {
      return await sp.blog.create({
        content,
        title,
        author: JSON.parse(localStorage.getItem("userId") || ""),
      });
    },
    onSuccess: () => {
      //@ts-ignore
      queryClient.invalidateQueries("posts");
    },
    mutationKey: ["create"],
  });

  const posts = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await sp.blog.find(
        {
          // content: { $re: "[0-9]." },
          title: "New Post",
        },
        {
          //@ts-ignore
          orderBy: [{ title: 1 }],
          limit: 3,
          offset: 0,
        },
      );
      return res.data;
    },
  });

  const checkBlogAuth = async () => {
    const res = await sp.blog.checkJwt();
    console.log(res);
  };

  const doSomething = async () => {
    console.log("do");
    await sp.blog.find({ author: 1 });
  };

  return (
    <div className="flex flex-col">
      <Card className="flex flex-col">
        <CardHeader className="text-center">
          <CardTitle>Blog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-2">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={() => createPost.mutate()}>Create Post</Button>
        </CardContent>
        <CardFooter className="space-x-1">
          <Button onClick={checkBlogAuth}>Check Blog Auth</Button>
          <Button onClick={doSomething}>Do</Button>
        </CardFooter>
      </Card>
      <h1>Blog</h1>
      <div className="space-y-2">
        {posts.data?.map((post) => <BlogCard key={post.id} blog={post} />)}
      </div>
    </div>
  );
}
