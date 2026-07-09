import React, { useEffect } from "react";
import { BlogComposition } from "@/compositions/marketing/resources/blog/BlogComposition";

export function BlogPage(): React.JSX.Element {
  useEffect(() => {
    document.title = "Learn & Magazine | PragyaOS";
  }, []);

  return <BlogComposition />;
}

export default BlogPage;
