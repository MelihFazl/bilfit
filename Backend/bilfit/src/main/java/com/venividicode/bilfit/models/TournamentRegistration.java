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
	// list of all the ID's of the team members
	@ManyToMany
	private List<GymMember> teamMembers;
	@OneToOne
	private Tournament tournament;

}