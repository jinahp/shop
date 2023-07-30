package com.jinah.shop.dto;

import lombok.Data;

@Data
public class JoinDTO {

    private String email;
    private String password;
    private String passwordConfirm;
    private String name;
}
