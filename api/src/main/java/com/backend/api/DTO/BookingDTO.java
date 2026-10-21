package com.backend.api.DTO;

public class BookingDTO {
    private String email;
    private String maidservice;
    private String area;
    private String date;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}