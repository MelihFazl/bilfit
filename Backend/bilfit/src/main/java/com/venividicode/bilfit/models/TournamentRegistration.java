package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.util.List;

/**
 * A model class representing the TournamentRegistration entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class TournamentRegistration {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// the gym member who made this tournament registration
	@OneToOne
	private GymMember registerer;
	// list of all the ID's of the team members
	@ElementCollection(targetClass = Long.class)
	private List<Long> teamMembersID;
	public GymMember getRegisterer() {
		return this.registerer;
	}

}