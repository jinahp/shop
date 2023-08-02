package com.jinah.shop.dao;

import com.jinah.shop.dto.DTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DaoMapper {
    List<DTO> listAll(); // 데이터베이스에서 모든 데이터를 가져오는 메서드

    void write(DTO dto); // 데이터를 데이터베이스에 저장하는 메서드

    void updateItem(@Param("num") Long id, @Param("dto") DTO dto); // 데이터베이스의 아이템을 업데이트하는 메서드

    void deleteItem(@Param("num") Long id); // 데이터베이스의 아이템을 삭제하는 메서드

    DTO getDTOById(@Param("num") Long id); // 데이터베이스에서 아이템의 ID로 단일 아이템을 가져오는 메서드

    DTO getDTOByNum(@Param("num") Long num); // 데이터베이스에서 아이템의 번호로 단일 아이템을 가져오는 메서드


}
