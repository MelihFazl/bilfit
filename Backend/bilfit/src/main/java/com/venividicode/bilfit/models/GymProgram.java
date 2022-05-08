package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * A model class representing the Gym Program entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
public class GymProgram {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	//@OneToOne
	//private GymMember owner;
	// author is the gym staff who wrote this gym program
	@OneToOne
	private GymStaff author;
	// textual description of the gym program
	private String description;

}