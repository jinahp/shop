package com.jinah.shop.dto;

import lombok.Data;

import java.util.Date;

@Data
public class DTO {
    private int num;
    private String title;
    private String content;
    private String writer;
    private Date writeDate;
}