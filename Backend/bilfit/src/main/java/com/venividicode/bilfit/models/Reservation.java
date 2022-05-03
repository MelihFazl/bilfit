package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reservation {




	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	private String reservedTimeInterval;
	@OneToOne
	private SportActivity reservationActivity;
	@OneToOne
	private SportCenter reservationPlace;
	//@Enumerated
	//private ReservationStatus status;

	// ?????
	private ReservationState reservationState;


	@OneToOne
	private GymMember reserver;
	private LocalDateTime reservationDay;
	@OneToOne
	private Field reservationField;


	public void reserve(){
		this.reservationState = this.reservationState.reserve();
	}
	public void attend(){
		this.reservationState = this.reservationState.attend();

	}
	public void notAttend(){
		this.reservationState = this.reservationState.notAttend();
	}
	public void cancel(){
		this.reservationState = this.reservationState.cancel();
	}


}