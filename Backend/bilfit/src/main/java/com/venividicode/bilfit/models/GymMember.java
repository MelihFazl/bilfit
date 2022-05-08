package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.implementation.bind.annotation.Empty;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

/**
 * A model class representing the GymMember entity
 * (extends user)
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class GymMember extends User {

	// some physical and personal attributes
	private Double height;
	private Double weight;
	private String gender;
	private LocalDateTime birthday;
	// all the reservations made by the gym member
	//@OneToMany
	//private List<Reservation> reservations;
	// whether the user is restricted or not
	private Boolean isRestricted;
	// the gym program written for this user
	@OneToOne
	private GymProgram program;
	//private MemberTypeStrategy typeStrategy;
}