package com.venividicode.bilfit.models;

public class ReservationNotAttendedState implements ReservationState {

    private static ReservationNotAttendedState instance;

    private ReservationNotAttendedState(){};

    // singleton logic
    public static ReservationNotAttendedState getInstance() {
        if (instance == null)
            instance = new ReservationNotAttendedState();
        return instance;
    }


    @Override
    public ReservationState reserve() {
        // ??
        return this;
    }

    @Override
    public ReservationState attend() {
        // ??
        return this;
    }

    @Override
    public ReservationState notAttend() {
        return this;
    }

    @Override
    public ReservationState cancel() {
        return ReservationCancelledState.getInstance();
    }
}
