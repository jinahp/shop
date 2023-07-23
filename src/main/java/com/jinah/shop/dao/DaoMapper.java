package com.jinah.shop.dao;


import com.jinah.shop.dto.DTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DaoMapper {
    public List<DTO> listAll(); // dB데이터를 불러오는 메소드
    public void write(DTO dto); // dB에 데이터를 저장하는 메소드
}