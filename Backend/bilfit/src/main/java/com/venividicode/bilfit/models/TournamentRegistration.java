package com.venividicode.bilfit.models;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TournamentRegistration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;

	@OneToOne
	private GymMember registerer;
	@ElementCollection(targetClass = Long.class)
	private List<Long> teamMembersID;
	public GymMember getRegisterer() {
		return this.registerer;
	}

}