package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * A model class representing the GymProgramRequest entity
 * To clarify: GymProgramRequest is sent by a gym member,
 * GymProgram is sent by a gym staff, as a response to the
 * GymProgramRequest
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
public class GymProgramRequest {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// the gym member who sent this gym program request
	@OneToOne
	private GymMember owner;
	// textual description of the gym program request
	private String description;
	//@Enumerated
	//private RequestStatus status;
}