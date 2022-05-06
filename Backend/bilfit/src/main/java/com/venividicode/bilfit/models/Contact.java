package com.venividicode.bilfit.models;
import javax.persistence.*;
import java.util.List;


/**
 * A model class representing the Contact entity
 * @author Veni Vidi Code
 */
@Entity
public class Contact {

    // auto generated ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @OneToMany
    private List<SportCenter> sportCenters;
    @OneToMany
    private List<GymStaff> gymStaffs;


    // simple get and set methods below
    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public List<SportCenter> getSportCenters() {
        return sportCenters;
    }

    public void setSportCenters(List<SportCenter> sportCenters) {
        this.sportCenters = sportCenters;
    }

    public List<GymStaff> getGymStaffs() {
        return gymStaffs;
    }

    public void setGymStaffs(List<GymStaff> gymStaffs) {
        this.gymStaffs = gymStaffs;
    }
}
