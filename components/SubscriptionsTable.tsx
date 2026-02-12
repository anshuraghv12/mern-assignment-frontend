'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import {
  fetchSubscriptions,
  addSubscription,
  cancelSubscription
} from '../store/subscriptionsSlice';

export const SubscriptionsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, activeCount, loading } = useSelector(
    (state: any) => state.subscriptions
  );

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(addSubscription());
  };

  const handleCancel = () => {
    // API limitation: this will cancel the *first* active subscription found on server.
    // The specific ID passed here is ignored by the API, but we pass the intent anyway.
    dispatch(cancelSubscription());
  };

  if (loading && data.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Active subscriptions: {activeCount}</h3>
        <button
          onClick={handleAdd}
          disabled={loading}
          style={{ padding: '8px 16px', cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Processing...' : 'Add New Subscription'}
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data.map((s: any) => (
          <li
            key={s.id}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>ID: {s.id} - <strong>{s.status.toUpperCase()}</strong></span>
            {s.status === 'active' && (
              <button
                onClick={handleCancel}
                disabled={loading}
                style={{
                  color: 'red',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                Cancel
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
