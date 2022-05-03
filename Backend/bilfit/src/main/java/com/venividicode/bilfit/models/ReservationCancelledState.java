package com.venividicode.bilfit.models;

public class ReservationCancelledState implements ReservationState {

    private static ReservationCancelledState instance;

    private ReservationCancelledState(){};

    // singleton logic
    public static ReservationCancelledState getInstance() {
        if (instance == null)
            instance = new ReservationCancelledState();
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
        // ??
        return this;
    }

    @Override
    public ReservationState cancel() {
        // ??
        return this;
    }
}
