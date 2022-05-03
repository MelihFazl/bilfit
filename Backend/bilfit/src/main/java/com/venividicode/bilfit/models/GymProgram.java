package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class GymProgram {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	//@OneToOne
	//private GymMember owner;
	//@OneToOne
	//private GymStaff author;
	private String description;

}