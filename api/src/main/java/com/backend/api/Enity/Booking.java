package com.backend.api.Enity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // Ensures non-null association
    @JsonManagedReference // Avoids infinite recursion
    private User user;


    private String maidservice;

    private String area;

    private String date;

    @ManyToOne
    @JoinColumn(name = "maid_id", nullable = true)
    @JsonManagedReference
    private Maid maid;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMaidservice() {
        return maidservice;
    }

    public void setMaidservice(String maidservice) {
        this.maidservice = maidservice;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Maid getMaid() {
        return maid;
    }

    public void setMaid(Maid maid) {
        this.maid = maid;
    }
}
