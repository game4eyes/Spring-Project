package com.travel.booking;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "KIC 관광 공사 API 명세서",
                description = "KIC 관광공사 에서 사용하는 api 명세서 입니다.",
                version = "v0.1.0"
        )
)
public class OpenApiConfig {
    @Bean
    public GroupedOpenApi openAPI() {
        return GroupedOpenApi.builder()
                .group("odsay")
                .pathsToMatch("/odsay/**")
                .build();
    }
}