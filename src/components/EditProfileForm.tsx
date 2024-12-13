'use client';

import FormError from '@/components/FormError';
import { updateProfile } from '@/lib/actions';
import { useActionState, useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const initialState: {
  success: string;
  errors: string[];
} = {
  success: '',
  errors: [],
};

export default function EditProfileForm() {
  const [formState, formAction, pending] = useActionState(
    updateProfile,
    initialState
  );
  const [formFieldState, setFormFieldState] = useState({
    name: '',
    theme: '#000000',
    visibility: 'ALL',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setLoading(true);
        const response = await fetch('/api/user');
        const data = await response.json();

        setFormFieldState({
          name: data.name,
          theme: data.theme,
          visibility: data.visibility,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  if (loading)
    return (
      <div className="flex gap-2 items-center mt-8 ">
        <LoadingSpinner />
        Fetching your profile...
      </div>
    );

  return (
    <form className="w-full space-y-4" action={formAction}>
      {/* Name */}
      <div>
        <label htmlFor="name">Display Name</label>

        <input
          type="text"
          name="name"
          id="name"
          className="border rounded p-2 w-full"
          value={formFieldState.name}
          onChange={(e) =>
            setFormFieldState({ ...formFieldState, name: e.target.value })
          }
          required
        />
      </div>

      <div className="sm:grid-cols-2 gap-4 hidden">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <label htmlFor="visibility">Profile Visibility</label>

          <select
            name="visibility"
            id="visibility"
            className="border rounded"
            value={formFieldState.visibility}
            onChange={(e) =>
              setFormFieldState({
                ...formFieldState,
                visibility: e.target.value,
              })
            }
            required
          >
            <option value="ALL">All</option>
            <option value="FRIENDS">Friends only</option>
            <option value="HIDDEN">Hidden</option>
          </select>
        </div>

        <div className="flex items-center gap-2 ">
          <label htmlFor="theme">Theme Color</label>

          <input
            type="color"
            name="theme"
            id="theme"
            className="border rounded cursor-pointer"
            value={formFieldState.theme}
            onChange={(e) =>
              setFormFieldState({ ...formFieldState, theme: e.target.value })
            }
          />
        </div>
      </div>

      <button
        className="btn btn--primary place-self-end"
        disabled={pending}
        type="submit"
      >
        {pending && <LoadingSpinner className="mr-2" />}
        {pending ? 'Saving...' : 'Save'}
      </button>

      {formState.errors.map((error, index) => (
        <FormError key={index}>{error}</FormError>
      ))}

      {formState.success && (
        <p className="text-green-500">{formState.success}</p>
      )}
    </form>
  );
}
