import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const events = [
  {
    _id: "dsdsd",
    title: "Cumpleaños del jefe",
    notes: "Comprar el pastel",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Randall",
    },
  },
];

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: events,
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
  },
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent } =
  calendarSlice.actions;
