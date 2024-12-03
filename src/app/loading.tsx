import LoadingSpinner from '@/components/LoadingSpinner';
import React from 'react';

export default function Loading() {
  return (
    <div className="container px-8 py-16">
      <LoadingSpinner className="mx-auto" />
    </div>
  );
}
