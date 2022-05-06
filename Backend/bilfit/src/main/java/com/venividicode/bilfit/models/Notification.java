package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * A model class representing the Notification entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Notification {
	// auto generated ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	// ID's of the users who are to see this notification
	@ElementCollection(targetClass=Long.class)
	private List<Long> targetIDs;
	// textual content of the notification
	private String content;
	// title of the notification
	private String title;
	//Annotation?
	public List<Long> getTargetIDs() {
		return targetIDs;
	}

}