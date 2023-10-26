// File path should be `post/detail/[id].tsx` to support routes like post/detail/1, post/detail/2 etc.

"use client";
import React, { useState, useEffect } from "react";
import * as PD from "./page.styled";
import { Posting } from "@/@types/Posting";
import CommentList from "../CommentList";
import LikeAndShare from "../LikeAndShare";
import PostContent from "../PostContent";
import axios from "axios";

interface PostDetailProps {
  data: Posting;
}

export default function PostDetail({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Posting | null>(null);

  const fetchPostDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/articles/${params.id}`);
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [params.id]);

  if (!data) return <div>Loading...</div>;

  return (
    <PD.Wrapper>
      <PD.Content>
        <PostContent data={data} />
        <LikeAndShare />
        <CommentList />
      </PD.Content>
    </PD.Wrapper>
  );
}
