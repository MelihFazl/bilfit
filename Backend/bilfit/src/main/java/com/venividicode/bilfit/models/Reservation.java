package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * A model class representing the Reservation entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reservation {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	private String reservedTimeInterval;
	// sport activity of the reservation
	@OneToOne
	private SportActivity reservationActivity;
	// sport center of the reservation
	@OneToOne
	private SportCenter reservationPlace;
	// status of the reservation
	@Enumerated
	private ReservationStatus status;
	@ManyToOne
	private GymMember reserver;
	// date of the reservation
	private LocalDate reservationDate;
	// field of the reservation
	@OneToOne
	private Field reservationField;
}