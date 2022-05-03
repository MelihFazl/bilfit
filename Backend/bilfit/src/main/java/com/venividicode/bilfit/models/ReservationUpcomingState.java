package com.venividicode.bilfit.models;


public class ReservationUpcomingState implements ReservationState {

    private static ReservationUpcomingState instance;

    private ReservationUpcomingState(){};

    // singleton logic
    public static ReservationUpcomingState getInstance() {
        if (instance == null)
            instance = new ReservationUpcomingState();
        return instance;
    }


    @Override
    public ReservationState reserve() {
        return this;
    }

    @Override
    public ReservationState attend() {
        return ReservationAttendedState.getInstance();
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