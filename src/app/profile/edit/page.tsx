import EditProfileForm from "@/components/EditProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | Map Mates",
};

export default async function EditProfilePage() {
  return (
    <div className="container py-8 md:py-16">
      <div className="mx-auto flex flex-col items-center rounded border bg-white p-4 shadow md:max-w-screen-sm md:p-8">
        <h1 className="mt-4 text-2xl font-bold">Edit Profile</h1>

        <EditProfileForm />
      </div>
    </div>
  );
}
