import { client } from "@/lib/sanity";
import DepartmentsExperience from "@/components/department/DepartmentsExperience";

export type Department = {
  _id: string;
  title: string;
  description?: string;
  image?: any;
  slug?: string;
};

async function getDepartments(): Promise<Department[]> {
  const query = `*[
    _type == "department"
  ] | order(_createdAt asc) {
    _id,
    title,
    description,
    image,
    "slug": slug.current
  }`;

  return client.fetch<Department[]>(
    query,
    {},
    {
      next: {
        revalidate: 300,
      },
    }
  );
}

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return <DepartmentsExperience departments={departments} />;
}