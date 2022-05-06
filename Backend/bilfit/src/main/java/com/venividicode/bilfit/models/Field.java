package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * A model class representing the Field entity
 * Field represents the places used for sport activities
 * For example: North Tennis Court, Second Football Pitch...
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Field {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// max number of people that can use the field in a specified time slot
	private Integer maxQuota;
	// name of the field
	private String name;
	@OneToMany
	List<TimeSlotOnDay> occupiableTimeSlotsOnDay;
}