package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tournament {

	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long ID;
	private String name;
	private LocalDateTime deadline;
	private int maxQuota;
	@OneToMany
	private List<TournamentRegistration> registrations;
	private String description;
	@OneToMany
	private List<Field> fields;

}