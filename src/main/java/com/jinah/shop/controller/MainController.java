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

    // Controller to update an item
    @PutMapping("/api/dao/{num}")
    public void updateItem(@PathVariable("num") Long num, @RequestBody DTO dto) {
        // Fetch the existing item from the database
        DTO existingDTO = mapper.getDTOByNum(num);
        if (existingDTO != null) {
            existingDTO.setTitle(dto.getTitle());
            existingDTO.setWriter(dto.getWriter());
            existingDTO.setWriteDate(dto.getWriteDate());
            existingDTO.setContent(dto.getContent());

            mapper.updateItem(num, existingDTO);
        } else {
            throw new RuntimeException("게시물을 찾을 수 없습니다.");
        }
    }

    @GetMapping("/api/dao/{num}") // 새로운 API 엔드포인트 추가
    public DTO getDTOByNum(@PathVariable("num") Long num) {
        return mapper.getDTOByNum(num);
    }

    // Controller to delete an item
    @DeleteMapping("/api/dao/{id}")
    public void deleteItem(@PathVariable("id") Long id) {
        mapper.deleteItem(id);
    }

    @PostMapping("/api/order")
    public void order(OrderDTO dto) {
    }
}
