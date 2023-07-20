package com.jinah.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
/*SpringBootApplication 어노테이션이 붙어 있는 곳이 시작점
 	=> @Configuration: 해당 클래스가 설정 파일임을 알려주는 용도
  	      @EnableAutoConfiguration: 스프링의 다양한 설정이 자동으로 구성되고 완료됨
  	      @ComponentScan: 자동으로 컴포넌트 클래스를 검색하여 컴포넌트와 빈 클래스를 Spring Application Context에 등록함. (단, 메인 클래스가 위치한 패키지부터 이하 모든 클래스를 검색하여 Bean으로 등록)

  	      이 세가지를 하나로 합친 것.
 * */
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}