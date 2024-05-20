package com.travel.booking;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "KIC 관광 공사 API 명세서",
                description = "KIC 관광공사 에서 사용하는 api 명세서 입니다.",
                version = "v0.1.0"
        )
)
public class OpenApiConfig {
    private final String devUrl;
    private final String prodUrl;

    public OpenApiConfig(@Value("${votogether.openapi.dev-url}")String devUrl,
                         @Value("${votogether.openapi.prod-url}")String prodUrl) {
        this.devUrl = devUrl;
        this.prodUrl = prodUrl;
    }

    @Bean
    public OpenAPI customOpenAPI() {
        final Server devServer = new Server().url(devUrl);
        devServer.description("개발 환경 서버 URL");

        final Server prodServer = new Server().url(prodUrl);
        prodServer.description("운영 환경 서버 URL");

        return new OpenAPI()
                .servers(List.of(devServer, prodServer));
    }

    @Bean
    public GroupedOpenApi openAPI() {
        String[] paths = {"/odsay/**"};

        return GroupedOpenApi.builder()
                .group("odsay v1")
                .pathsToMatch(paths)
                .build();
    }
}