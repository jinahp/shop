package com.jinah.shop.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration // 설정을 위한 컴포넌트
@MapperScan("com.jinah.shop.dao") // 패키지 내의 @Mapper들을 빈 등록
public class DBConfig {
}
