import EditProfileForm from '@/components/EditProfileForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile | Map Mates',
};

export default async function EditProfilePage() {
  return (
    <div className="container py-8 md:py-16">
      <div className="bg-white rounded border shadow md:p-8 p-4 flex flex-col items-center md:max-w-screen-sm mx-auto">
        <h1 className="mt-4 text-2xl font-bold">Edit Profile</h1>

        <EditProfileForm />
      </div>
    </div>
  );
}
