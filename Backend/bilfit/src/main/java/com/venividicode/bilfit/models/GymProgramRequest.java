package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class GymProgramRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	@OneToOne
	private GymMember owner;
	private String description;
	//@Enumerated
	//private RequestStatus status;
}