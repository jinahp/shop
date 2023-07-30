package com.jinah.shop.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class SiteUser {

    private int num;
    private String mb_name;
    @JsonIgnore
    private String mb_pwd;
    private String email;
}
