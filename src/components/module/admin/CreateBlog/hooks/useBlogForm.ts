import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { BlogPostForm } from "@/type";

export const useBlogForm = () => {
  const { register, handleSubmit, reset, setValue, watch, control } =
    useForm<BlogPostForm>({
      defaultValues: {
        title: "",
        category: "",
        content: "",
      },
    });

  const resetForm = useCallback(() => {
    reset({
      title: "",
      category: "",
      content: "",
    });
  }, [reset]);

  return { register, handleSubmit, reset: resetForm, setValue, watch, control };
}; 