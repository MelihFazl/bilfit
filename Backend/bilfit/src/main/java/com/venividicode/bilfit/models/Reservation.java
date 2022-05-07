package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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
	@Enumerated
	private ReservationStatus status;
	private Long reserverID;

	private LocalDate reservationDate;
	@OneToOne
	private Field reservationField;
}