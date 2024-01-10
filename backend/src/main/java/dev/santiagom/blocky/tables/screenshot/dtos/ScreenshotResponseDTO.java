package dev.santiagom.blocky.tables.screenshot.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScreenshotResponseDTO {
    private String name;
    private String url;
}
