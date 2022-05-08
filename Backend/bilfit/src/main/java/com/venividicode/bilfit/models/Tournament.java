package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * A model class representing the Tournament entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tournament {

	// auto generated ID
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long ID;
	// name of the tournament
	private String name;
	// final day that accepts registrations
	private LocalDateTime deadline;
	// max number of teams that can compete in this tournament
	private Integer maxTeams;
	// max number of participants that can be in a single team
	private Integer maxNumberOfTeamMembers;
	// ID of the sport center the reservation made in
	private Long sportCenterID;
	// all the registrations to this tournament
	@OneToMany
	private List<TournamentRegistration> registrations;
	// textual description of the tournament
	private String description;
	// the fields that are used to carry out the tournament
	@ManyToMany
	private List<Field> fields;

}