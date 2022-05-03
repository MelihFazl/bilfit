package com.venividicode.bilfit.models;

public class ReservationAttendedState implements ReservationState {

    private static ReservationAttendedState instance;

    private ReservationAttendedState(){};

    // singleton logic
    public static ReservationAttendedState getInstance() {
        if (instance == null)
            instance = new ReservationAttendedState();
        return instance;
    }


    @Override
    public ReservationState reserve() {
        // ?
        return this;
    }

    @Override
    public ReservationState attend() {
        return this;
    }

    @Override
    public ReservationState notAttend() {
        return ReservationNotAttendedState.getInstance();
    }

    @Override
    public ReservationState cancel() {
        return ReservationCancelledState.getInstance();
    }
}
