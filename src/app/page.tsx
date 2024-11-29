import AuthButton from '@/components/AuthButton';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="container my-8 md:my-16">
      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}

      <AuthButton />
    </div>
  );
}
