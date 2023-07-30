package com.jinah.shop.controller;

import com.jinah.shop.dao.DaoMapper;
import com.jinah.shop.dto.DTO;
import com.jinah.shop.dto.OrderDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;

@RestController
public class MainController {
    @Autowired
    private DaoMapper mapper;
    // DB데이터를 불러오는 controller
    @GetMapping("/api/dao")
    public HashMap<String, Object> list() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("list", mapper.listAll());
        return map;
    }

    // DB에 데이터를 저장하는 controller
    @PostMapping("/api/dao")
    public void write(DTO dto) {

        Date now = new Date();

        dto.setTitle(dto.getTitle().trim());
        dto.setContent(dto.getContent());
        dto.setWriter(dto.getWriter().trim());
        dto.setWriteDate(now);
        mapper.write(dto);
    }
    @PostMapping("/api/order")
    public void order(OrderDTO dto) {
    }
}
