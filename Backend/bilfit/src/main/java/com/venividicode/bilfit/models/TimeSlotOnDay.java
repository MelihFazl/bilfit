package com.venividicode.bilfit.models;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * A model class representing the TimeSlotOnDay entity
 * @author Veni Vidi Code
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class TimeSlotOnDay {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long ID;
    private LocalDate date;
    @OneToMany
    private List<TimeSlot> timeSlotList;
}
