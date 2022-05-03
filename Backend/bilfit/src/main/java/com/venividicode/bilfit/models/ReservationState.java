package com.venividicode.bilfit.models;


public interface ReservationState {


    public ReservationState reserve();
    public ReservationState attend();
    public ReservationState notAttend();
    public ReservationState cancel();

}
