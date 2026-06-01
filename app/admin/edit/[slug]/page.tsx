import EditBlogForm from "@/components/admin/blog-edit-form";


export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="p-8">
      <EditBlogForm slug={slug} />
    </div>
  );
}