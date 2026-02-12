import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetch",
  async () => {
    const res = await fetch('/api/subscriptions');
    return res.json();
  }
);

export const addSubscription = createAsyncThunk(
  "subscriptions/add",
  async () => {
    const res = await fetch('/api/subscriptions', { method: 'POST' });
    return res.json();
  }
);

export const cancelSubscription = createAsyncThunk(
  "subscriptions/cancel",
  async () => {
    const res = await fetch('/api/subscriptions', { method: 'PATCH' });
    return res.json();
  }
);

type Subscription = {
  id: string;
  status: 'active' | 'cancelled';
};

type SubscriptionsState = {
  data: Subscription[];
  loading: boolean;
  activeCount: number;
};

const initialState: SubscriptionsState = {
  data: [],
  loading: false,
  activeCount: 0
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.data = action.payload;
        // Recalculate active count based on fresh data
        state.activeCount = action.payload.filter(
          (s: Subscription) => s.status === 'active'
        ).length;
        state.loading = false;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        // Optimistically append the new subscription since API returns it
        state.data.push(action.payload);
        state.activeCount += 1;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        // The API returns the subscription that was cancelled (or null if none)
        const cancelledSub = action.payload as Subscription | null;
        if (cancelledSub) {
          const index = state.data.findIndex((s) => s.id === cancelledSub.id);
          if (index !== -1) {
            state.data[index] = cancelledSub;
          }
          // Re-calculate active count
          state.activeCount = state.data.filter(
            (s: Subscription) => s.status === 'active'
          ).length;
        }
      });
  }
});

export default subscriptionsSlice.reducer;
