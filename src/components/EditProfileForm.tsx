'use client';

import FormError from '@/components/FormError';
import LoadingSpinner from '@/components/LoadingSpinner';
import StaticMap from '@/components/Map/StaticMap';
import { updateProfile } from '@/lib/actions';
import { useActionState, useEffect, useState } from 'react';

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
    // Profile settings
    name: '',
    visibility: 'ALL',

    // Personalization
    backgroundColor: '#fff',
    unvisitedCountryColor: '#fff',
    visitedCountryColor: '#5bc35b',
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
          visibility: data.visibility,
          backgroundColor: data.backgroundColor,
          unvisitedCountryColor: data.unvisitedCountryColor,
          visitedCountryColor: data.visitedCountryColor,
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
      <h2 className="text-lg font-bold">Settings</h2>

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

      <div className="hidden">
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

      <hr />

      {/* Personalization */}
      <h2 className="text-lg font-bold">Personalization</h2>

      <div className="flex gap-2 items-center">
        <label htmlFor="backgroundColor">Background Color</label>

        <input
          type="color"
          name="backgroundColor"
          id="backgroundColor"
          className="border rounded p-2 w-full"
          value={formFieldState.backgroundColor}
          onChange={(e) =>
            setFormFieldState({
              ...formFieldState,
              backgroundColor: e.target.value,
            })
          }
        />
      </div>

      <div className="flex gap-2 items-center">
        <label htmlFor="unvisitedCountryColor">Unvisited Country Color</label>

        <input
          type="color"
          name="unvisitedCountryColor"
          id="unvisitedCountryColor"
          className="border rounded p-2 w-full"
          value={formFieldState.unvisitedCountryColor}
          onChange={(e) =>
            setFormFieldState({
              ...formFieldState,
              unvisitedCountryColor: e.target.value,
            })
          }
        />
      </div>

      <div className="flex gap-2 items-center">
        <label htmlFor="visitedCountryColor">Visited Country Color</label>

        <input
          type="color"
          name="visitedCountryColor"
          id="visitedCountryColor"
          className="border rounded p-2 w-full"
          value={formFieldState.visitedCountryColor}
          onChange={(e) =>
            setFormFieldState({
              ...formFieldState,
              visitedCountryColor: e.target.value,
            })
          }
        />
      </div>

      <StaticMap
        visitedCountries={[
          '826',
          '352',
          '578',
          '276',
          '616',
          '191',
          '300',
          '528',
          '752',
          '724',
          '428',
          '246',
          '380',
        ]}
        backgroundColor={formFieldState.backgroundColor}
        unvisitedCountryColor={formFieldState.unvisitedCountryColor}
        visitedCountryColor={formFieldState.visitedCountryColor}
      />

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
