package com.venividicode.bilfit.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

/**
 * A model class representing the Announcement entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Announcement {

	// auto generated id
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// title of the announcement
	private String title;
	// more detailed description of the announcement
	private String description;
	// the date when the announcement is post
	private LocalDateTime date;
}